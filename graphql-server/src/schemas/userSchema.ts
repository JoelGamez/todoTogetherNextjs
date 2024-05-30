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

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    authenticateUser(username: String!, password: String!): AuthPayload!
  }
`;

export default userTypeDefs;
