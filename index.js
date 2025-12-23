import app from './app.js';
import connectDB from './src/config/db.js';
import { PORT } from './src/config/env.js'; 
import createApolloServer from './server.js';

const startServer = async () => {
    // Connect to Database
    await connectDB();
    
    // Start Apollo Server
    const server = await createApolloServer();
    await server.start();
    
    // Apply Middleware
    server.applyMiddleware({ app });
    
    // Start Express Server
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();
