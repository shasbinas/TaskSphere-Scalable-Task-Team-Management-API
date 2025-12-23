import { gql } from 'apollo-server-express';

const taskTypeDefs = gql`
  type Task {
    id: ID!
    title: String!
    status: String!
    project: Project!
    assignedTo: User
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getTasksByProject(projectId: ID!): [Task]
    getTasksByUser: [Task]
  }

  extend type Mutation {
    createTask(title: String!, projectId: ID!, assignedTo: ID): Task
    updateTaskStatus(id: ID!, status: String!): Task
    assignTask(taskId: ID!, userId: ID!): Task
    deleteTask(id: ID!): Boolean
  }
`;

export default taskTypeDefs;
