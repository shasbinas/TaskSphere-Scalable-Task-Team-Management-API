import * as projectController from '../../controllers/project.controller.js';
import User from '../../models/User.model.js';
import Project from '../../models/Project.model.js';

const projectResolvers = {
  Query: {
    getProjects: async (_, __, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return await projectController.getUserProjects(context.user._id);
    },
    getProject: async (_, { id }, context) => {
        if (!context.user) throw new Error('Not authenticated');
        // Add specific fetch logic in controller if needed, or direct generic fetch
        return await Project.findById(id).populate('owner').populate('members');
    }
  },
  Mutation: {
    createProject: async (_, { name }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return await projectController.createProject(name, context.user._id);
    },
    updateProject: async (_, { id, name }, context) => {
        if (!context.user) throw new Error('Not authenticated');
        return await projectController.updateProject(id, name, context.user._id);
    },
    deleteProject: async (_, { id }, context) => {
        if (!context.user) throw new Error('Not authenticated');
        return await projectController.deleteProject(id, context.user._id, context.user.role);
    },
    addProjectMember: async (_, { projectId, userId }, context) => {
        if (!context.user) throw new Error('Not authenticated');
        return await projectController.addMember(projectId, userId, context.user._id);
    }
  },
  Project: {
      // Field resolvers if needed, for instance, populating owner and members is done in controller/service
      // but if we returned IDs, we'd resolve them here.
      // Current controller populates them, so we are good.
      // But let's check one thing: Project.owner in Mongoose is ObjectId, but in GraphQL it's User object.
      // If controller doesn't populate, we need a resolver here.
      // updateProject returns 'updatedProject' which might not be populated?
      // Mongoose save() returns the document usually unpopulated unless we repopulate.
      
      owner: async (parent) => {
          if (parent.owner && parent.owner.username) return parent.owner; // already populated
          return await User.findById(parent.owner);
      },
      members: async (parent) => {
           if (parent.members && parent.members.length > 0 && parent.members[0].username) return parent.members;
           return await User.find({ _id: { $in: parent.members } });
      }
  }
};

export default projectResolvers;
