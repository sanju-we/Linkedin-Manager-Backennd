import express from 'express';
import { config } from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);

// Export the app for testing
export default app;

// Start the server only when this file is run directly
if (process.argv[1].endsWith('server.js')) {
    app.listen(config.port, () => {
        console.log(`Server running on http://localhost:${config.port}`);
    });
}
