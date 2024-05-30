const taskTypeDefs = `

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

export default taskTypeDefs;
