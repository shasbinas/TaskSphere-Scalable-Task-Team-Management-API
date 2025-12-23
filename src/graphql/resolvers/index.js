import userResolvers from './user.resolver.js';
import projectResolvers from './project.resolver.js';
import taskResolvers from './task.resolver.js';

// Simple manual merge if we don't have lodash.merge or similar
// Since keys are distinct (Query/Mutation fields) or unique Types,
// we can merge broadly.
// However, 'Query' in each resolver object needs to be merged into one 'Query' object.

const mergedResolvers = {
  Query: {
    ...userResolvers.Query,
    ...projectResolvers.Query,
    ...taskResolvers.Query,
  },
  Mutation: {
     ...userResolvers.Mutation,
     ...projectResolvers.Mutation,
     ...taskResolvers.Mutation,
  }
};

// Manually add other types
if (userResolvers.User) mergedResolvers.User = userResolvers.User; // if we have it
if (projectResolvers.Project) mergedResolvers.Project = projectResolvers.Project;
if (taskResolvers.Task) mergedResolvers.Task = taskResolvers.Task;

export default mergedResolvers;
