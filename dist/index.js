import 'reflect-metadata';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { createApp } from './app';
import { logger } from './utils/logger';
dotenv.config();
const app = createApp();
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        logger.info(`Server running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    logger.error(`Server failed to start: ${error}`);
});
//# sourceMappingURL=index.js.map