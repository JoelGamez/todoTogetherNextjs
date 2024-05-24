// src/index.ts
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { v4 as uuidv4 } from "uuid";
import Task from "../../src/models/task";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

// Define the schema
const typeDefs = `

  enum Priority {
    LOW
    MEDIUM
    HIGH
  }

  type Task {
    id: ID!
    title: String!
    points: Int!
    completed: Boolean!
    priority: Priority!
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    addTask(title: String!, points: Int!, priority: Priority!): Task
    updateTask(id: ID!, title: String, points: Int, completed: Boolean, priority: Priority!): Task
    deleteTask(id: ID!): Task
  }
`;

// Define the resolvers
// const tasks = [
//   { id: "1", title: "Task 1", points: 10, completed: false, priority: "LOW" },
//   {
//     id: "2",
//     title: "Task 2",
//     points: 20,
//     completed: false,
//     priority: "MEDIUM",
//   },
// ];

const resolvers = {
  Query: {
    tasks: async () => {
      try {
        return await Task.findAll({
          order: [["createdAt", "ASC"]],
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Error fetching tasks");
      }
    },
  },
  Mutation: {
    addTask: async (
      _: any,
      {
        title,
        points,
        priority,
      }: { title: string; points: number; priority: "LOW" | "MEDIUM" | "HIGH" }
    ) => {
      try {
        return await Task.create({ title, points, priority, completed: false });
      } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Error adding task");
      }
    },
    updateTask: async (
      _: any,
      {
        id,
        title,
        points,
        completed,
        priority,
      }: {
        id: string;
        title?: string;
        points?: number;
        completed?: boolean;
        priority?: "LOW" | "MEDIUM" | "HIGH";
      }
    ) => {
      try {
        const task = await Task.findByPk(id);
        if (!task) {
          throw new Error("Task not found");
        }
        if (title !== undefined) task.title = title;
        if (points !== undefined) task.points = points;
        if (completed !== undefined) task.completed = completed;
        if (priority !== undefined) task.priority = priority;
        await task.save();
        return task;
      } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Error updating task");
      }
    },
    deleteTask: async (_: any, { id }: { id: string }) => {
      try {
        const task = await Task.findByPk(id);
        if (!task) {
          throw new Error("Task not found");
        }
        await task.destroy();
        return task;
      } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Error deleting task");
      }
    },
  },
};

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
