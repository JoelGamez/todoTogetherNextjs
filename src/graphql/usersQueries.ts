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
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
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

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;
