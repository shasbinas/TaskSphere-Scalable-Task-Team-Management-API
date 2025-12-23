import User from '../models/User.model.js';

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    return user;
  } else {
    throw new Error('User not found');
  }
};

export const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};


