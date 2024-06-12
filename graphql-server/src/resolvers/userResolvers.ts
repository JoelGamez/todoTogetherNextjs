// src/userResolvers.ts
import User from "../../../src/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import { log } from "console";
import redisClient from "../../../src/lib/redisClient";
import { ApolloError } from "apollo-server-express";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const userResolvers = {
  Query: {
    users: async () => {
      try {
        return await User.findAll();
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
      }
    },
  },
  Mutation: {
    addUser: async (
      _: any,
      {
        username,
        email,
        password,
      }: {
        username: string;
        email: string;
        password: string;
      }
    ) => {
      try {
        return await User.create({ username, email, password });
      } catch (error) {
        console.error("Error adding user:", error);
        throw new Error("Error adding user");
      }
    },
    authenticateUser: async (
      _: any,
      {
        username,
        password,
      }: {
        username: string;
        password: string;
      }
    ) => {
      try {
        const user = await User.findOne({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
          });
          return { user, token };
        } else {
          throw new Error("Invalid username or password");
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        throw new Error("Error authenticating user");
      }
    },
    logoutUser: async (_: unknown, { token }: { token: string }) => {
      // Check if the token exists
      if (!token) {
        throw new Error("No token provided");
      }
      try {
        // Calculate the remaining time until the token expires
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("payload", payload);
        const now = Math.floor(Date.now() / 1000);
        const remainingTime = payload.exp - now;

        // Check if the token has already expired
        if (remainingTime > 0) {
          await redisClient.set(token, "blacklisted", { EX: remainingTime });
        } else {
          console.error(
            "Error in logoutUser resolver: Token has already expired"
          );
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error in logoutUser resolver:", error);
        throw new ApolloError(
          "An error occurred while processing your request."
        );
      }
    },
  },
};

export default userResolvers;
