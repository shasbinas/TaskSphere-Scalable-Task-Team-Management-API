import { gql } from 'apollo-server-express';

const projectTypeDefs = gql`
  type Project {
    id: ID!
    name: String!
    owner: User!
    members: [User]
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getProjects: [Project]
    getProject(id: ID!): Project
  }

  extend type Mutation {
    createProject(name: String!): Project
    updateProject(id: ID!, name: String!): Project
    deleteProject(id: ID!): Boolean
    addProjectMember(projectId: ID!, userId: ID!): Project
  }
`;

export default projectTypeDefs;
