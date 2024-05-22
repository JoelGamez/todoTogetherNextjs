// src/index.ts
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

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
const tasks = [
  { id: '1', title: 'Task 1', points: 10, completed: false, priority: 'LOW' },
  { id: '2', title: 'Task 2', points: 20, completed: false, priority: 'MEDIUM' },
];

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    addTask: (_: any, { title, points, priority }: { title: string, points: number, priority: string }) => {
      const newTask = { id: uuidv4(), title, points, completed: false, priority };
      tasks.push(newTask);
      return newTask;
    },
    updateTask: (_: any, { id, title, points, completed }: { id: string, title?: string, points?: number, completed?: boolean }) => {
      const task = tasks.find(task => task.id === id);
      if (task) {
        if (title !== undefined) task.title = title;
        if (points !== undefined) task.points = points;
        if (completed !== undefined) task.completed = completed;
      }
      return task;
    },
    deleteTask: (_: any, { id }: { id: string }) => {
      const index = tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        const [deletedTask] = tasks.splice(index, 1);
        return deletedTask; // return the deleted task instead of true
      }
      return null;
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
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();