const userTypeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User]
  }

  type ResetPasswordResponse {
    token: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    authenticateUser(email: String!, password: String!): AuthPayload!
    logoutUser(token: String!): String
    requestPasswordReset(email: String!): ResetPasswordResponse
    resetPassword(token: String!, password: String!): String
  }
`;

export default userTypeDefs;
