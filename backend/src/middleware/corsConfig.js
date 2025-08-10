/**
 * @file corsConfig.js
 * @brief This module defines and configures the CORS middleware for the Express application.
 * @details It sets specific options to control which origins, methods, and headers are allowed for cross-origin requests, enhancing the application's security.
 * @author Sergio Jiménez de la Cruz
 * @date August 8, 2025
 * @version 1.0.0
 * @license MIT
 */

import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

/**
 * @brief Configuration object for the CORS middleware.
 * @details This object defines the allowed origins, HTTP methods, and headers for cross-origin requests, ensuring secure communication between the front-end and back-end.
 */
const corsOptions = {
	origin: [`${process.env.LOCALHOST}:${process.env.PORT}`, `${process.env.LOCALHOST}:${process.env.VITE_PORT}`],
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization']
}

export default cors(corsOptions);