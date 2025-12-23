import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    createdAt: String
    updatedAt: String
  }

  type AuthResponse {
    token: String!
    user: User!
  }
  
  extend type Query {
    getMe: User
    getAllUsers: [User]
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!): AuthResponse
    login(email: String!, password: String!): AuthResponse

  }
`;

export default userTypeDefs;
