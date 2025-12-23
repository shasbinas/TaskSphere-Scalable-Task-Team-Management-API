import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export const { PORT, MONGO_DB_URI, JWT_SECRET, NODE_ENV } = config;
export default config;
