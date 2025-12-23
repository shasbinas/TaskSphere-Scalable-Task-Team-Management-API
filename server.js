import { ApolloServer } from 'apollo-server-express';
import typeDefs from './src/graphql/typeDefs/index.js';
import resolvers from './src/graphql/resolvers/index.js';
import User from './src/models/User.model.js';
import jwt from 'jsonwebtoken';

const createApolloServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: false, // Disabled for local development testing in Sandbox
        context: async ({ req }) => {
            let user = null;
            const token = req.headers.authorization || '';
            // console.log("Incoming Auth Header:", token); // Debug log

            if (token && token.startsWith('Bearer ')) {
                try {
                    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
                    user = await User.findById(decoded.id).select('-password');
                    // if (user) console.log("User found:", user.email);
                } catch (e) {
                     console.error('Auth verification failed:', e.message);
                }
            }
            return { user };
        }
    });
    return server;
}

export default createApolloServer;
