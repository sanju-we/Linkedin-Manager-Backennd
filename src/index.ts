import 'reflect-metadata'
import dotenv from 'dotenv'
import { connectDB } from './config/db.ts'
import { createApp } from './app.ts'
import { logger } from './utils/logger.ts'

dotenv.config()
const app = createApp()
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        logger.info(`Server running on port ${process.env.PORT}`)
    })
}).catch((error) => {
    logger.error(`Server failed to start: ${error}`)
})