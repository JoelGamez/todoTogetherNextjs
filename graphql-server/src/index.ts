import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { merge } from "lodash";
import taskTypeDefs from "../../graphql-server/src/schemas/taskSchema";
import taskResolvers from "../../graphql-server/src/resolvers/taskResolvers";
import userTypeDefs from "../../graphql-server/src/schemas/userSchema";
import userResolvers from "../../graphql-server/src/resolvers/userResolvers";

// Merge type definitions
const typeDefs = [taskTypeDefs, userTypeDefs];

// Merge resolvers
const resolvers = merge(taskResolvers, userResolvers);

// Create the schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server
const app = express();
const httpServer = http.createServer(app);

// Create Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  await server.start();
  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
