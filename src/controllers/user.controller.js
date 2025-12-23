import * as authService from '../services/auth.service.js';
import * as userService from '../services/user.service.js';

export const register = async (name, email, password, role) => {
  return await authService.registerUser({ name, email, password, role });
};

export const login = async (email, password) => {
  return await authService.loginUser(email, password);
};

export const getMe = async (userId) => {
  return await userService.getUserProfile(userId);
};

export const getAllUsers = async () => {
  return await userService.getAllUsers();
};


