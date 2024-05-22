// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      points
      completed
      priority
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($title: String!, $points: Int!, $priority: Priority!) {
    addTask(title: $title, points: $points, priority: $priority) {
      id
      title
      points
      completed
      priority
    }
  }
`;

// Define the DELETE_TASK mutation
export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;