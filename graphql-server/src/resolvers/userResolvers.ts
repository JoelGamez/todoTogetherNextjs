// src/userResolvers.ts
import User from "../../../src/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
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
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
          return { user, token };
        } else {
          throw new Error("Invalid username or password");
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        throw new Error("Error authenticating user");
      }
    },
  },
};

export default userResolvers;
