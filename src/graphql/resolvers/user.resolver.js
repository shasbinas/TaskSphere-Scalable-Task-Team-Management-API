import * as userController from '../../controllers/user.controller.js';

const userResolvers = {
  Query: {
    getMe: async (_, __, context) => {
      // Input: (parent, args, context)
      // We expect context.user to be set by auth middleware
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return await userController.getMe(context.user._id);
    },
    getAllUsers: async (_, __, context) => {
      // Check for Admin role?
      if (!context.user || context.user.role !== 'Admin') {
         throw new Error('Not authorized as Admin');
      }
      return await userController.getAllUsers();
    },
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      const result = await userController.register(name, email, password);
        return {
            token: result.token,
            user: result
        };
    },
    login: async (_, { email, password }) => {
      const result = await userController.login(email, password);
      return {
          token: result.token,
          user: result
      };
    },

  },
};

export default userResolvers;
