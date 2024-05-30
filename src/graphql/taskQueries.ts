// src/graphql/queries.ts
import { gql } from "@apollo/client";

// Task related queries and mutations...
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

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $points: Int
    $completed: Boolean
    $priority: Priority!
  ) {
    updateTask(
      id: $id
      title: $title
      points: $points
      completed: $completed
      priority: $priority
    ) {
      id
      title
      points
      completed
      priority
    }
  }
`;
