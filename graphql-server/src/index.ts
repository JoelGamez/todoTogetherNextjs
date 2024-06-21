import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { v4 as uuidv4 } from "uuid";
const express = require("express");
import { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { merge } from "lodash";
import taskTypeDefs from "../../graphql-server/src/schemas/taskSchema";
import taskResolvers from "../../graphql-server/src/resolvers/taskResolvers";
import userTypeDefs from "../../graphql-server/src/schemas/userSchema";
import userResolvers from "../../graphql-server/src/resolvers/userResolvers";
import redisClient from "../../src/lib/redisClient";
import dotenv from "dotenv";
import path from "path";
import { ClientClosedError } from "redis";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware function to check if a token is blacklisted
const checkBlacklist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const isSandboxMode =
    req.headers["x-sandbox-mode"] === "true" ||
    process.env.SANDBOX_MODE === "true";

  if (isSandboxMode) {
    // Skip JWT authentication
    next();
  } else {
    const token = req.headers.authorization?.split("Bearer ")[1];
    console.log(`Checking token: ${token}`);

    if (token) {
      try {
        const isBlacklisted = await redisClient.get(token);
        console.log(`Token ${token} is blacklisted: ${isBlacklisted}`);
        if (isBlacklisted) {
          res.status(401).json({ error: "This token has been blacklisted." });
          return;
        }
      } catch (err) {
        if (err instanceof ClientClosedError) {
          console.error("Redis client closed, attempting to reconnect...");
          await redisClient.connect();
          return checkBlacklist(req, res, next); // Retry the checkBlacklist function after reconnecting
        } else {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
      }
    }
    next();
  }
};

// Function to extract the operation name from the GraphQL query string
const extractOperationName = (query: string): string | null => {
  const trimmedQuery = query.trim();
  const match = trimmedQuery.match(/^(query|mutation)\s+(\w+)/);
  return match ? match[2] : null;
};

// JWT verification middleware
const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isSandboxMode =
    req.headers["x-sandbox-mode"] === "true" ||
    process.env.SANDBOX_MODE === "true";

  if (isSandboxMode) {
    // Skip JWT authentication
    next();
  } else {
    const noAuthOperations = [
      "AuthenticateUser",
      "AddUser",
      "ResetPassword",
      "RequestPasswordReset",
    ];
    let operationName = req.body.operationName;
    console.log(operationName, "operationName ---------------");
    if (!operationName && req.body.query) {
      operationName = extractOperationName(req.body.query);
      console.log(operationName, "operationName ---------------");
    }
    if (operationName && noAuthOperations.includes(operationName)) {
      return next();
    }
    const token = req.headers.authorization?.split("Bearer ")[1] || "";
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET!) as any;
      req.user = user;
      console.log("User:", user);
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  }
};

// Merge type definitions and resolvers
const typeDefs = [taskTypeDefs, userTypeDefs];
const resolvers = merge(taskResolvers, userResolvers);

// Create the schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server
const app = express();
app.use(cors()); // Enable all CORS requests
app.use(express.json());

// Use the blacklist check and JWT verification middlewares

app.use(checkBlacklist);
app.use(jwtMiddleware);

// Create Apollo Server
const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: ({ req }) => {
    return {
      userId: req.user?.id,
    };
  },
});

// Start the server before applying middleware
(async () => {
  // Ensure Redis client is connected before starting the server
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
