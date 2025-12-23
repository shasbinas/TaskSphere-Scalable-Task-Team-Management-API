import * as taskController from '../../controllers/task.controller.js';
import User from '../../models/User.model.js';
import Project from '../../models/Project.model.js';

const taskResolvers = {
  Query: {
    getTasksByProject: async (_, { projectId }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return await taskController.getTasksByProject(projectId);
    },
    getTasksByUser: async (_, __, context) => {
        if (!context.user) throw new Error('Not authenticated');
        return await taskController.getTasksByUser(context.user._id);
    }
  },
  Mutation: {
    createTask: async (_, { title, projectId, assignedTo }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return await taskController.createTask(title, projectId, assignedTo);
    },
    updateTaskStatus: async (_, { id, status }, context) => {
        if (!context.user) throw new Error('Not authenticated');
        return await taskController.updateTaskStatus(id, status);
    },
    assignTask: async (_, { taskId, userId }, context) => {
        if (!context.user || context.user.role !== 'Admin') {
            throw new Error('Not authorized as Admin');
        }
        return await taskController.assignTask(taskId, userId);
    },
    deleteTask: async (_, { id }, context) => {
        if (!context.user) throw new Error('Not authenticated');
        return await taskController.deleteTask(id);
    }
  },
  Task: {
      project: async (parent) => {
          if (parent.project && parent.project.name) return parent.project;
          return await Project.findById(parent.project);
      },
      assignedTo: async (parent) => {
          if (!parent.assignedTo) return null;
          if (parent.assignedTo && parent.assignedTo.name) return parent.assignedTo;
          return await User.findById(parent.assignedTo);
      }
  }
};

export default taskResolvers;
