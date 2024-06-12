import { gql } from "@apollo/client";

// User related queries and mutations...
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
    }
  }
`;
export const ADD_USERS = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      id
      username
      email
      password
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser($token: String!) {
    logoutUser(token: $token)
  }
`;
