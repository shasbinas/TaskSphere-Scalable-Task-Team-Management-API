import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'User'
  });

  if (user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};
