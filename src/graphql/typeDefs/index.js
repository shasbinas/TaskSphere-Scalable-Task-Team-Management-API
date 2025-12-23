import { gql } from 'apollo-server-express';
import userTypeDefs from './user.typeDef.js';
import projectTypeDefs from './project.typeDef.js';

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export default [baseTypeDefs, userTypeDefs, projectTypeDefs];
