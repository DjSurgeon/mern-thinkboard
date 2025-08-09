/**
 * @file app.js
 * @brief This is the main entry point for the Express application.
 * @details It initializes the Express server, connects to the database,, and configures all necessary middleware for security, logging,, and routing.
 * @author Sergio Jiménez de la Cruz
 * @data August 6, 2025
 * @version 1.0.0
 * @license MIT
 * @see {@link ./routes/notesRoutes.js} for the API's route definitions.
 */

import dotenv from "dotenv";
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import corsConfig from "./middleware/corsConfig.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { rateLimitRedis } from "./middleware/rateLimitRedis.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(rateLimitRedis);
app.use(apiLimiter);
app.use(corsConfig);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * @brief Middleware for logging incoming HTTP request.
 * @details This middleware logs the timestamp, HTTP method, and  URL for every incoming request.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 * It's useful for debugging and monitoring.
 */
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()} ${req.method} ${req.originalUrl}]`);
    next();
});

app.use("/api/notes", notesRoutes);

/**
 * @brief Handles GET request to the root endpoint.
 * @details This route serves as a simple health check, confirming that the API is running.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
app.get("/", (req, res) => {
	res.json({
		message: "API is Running"
	});
})

/**
 * @brief Start the Express server
 * @details The server listens for incoming request on the specified port.
 */
app.listen(PORT, () => {
	console.log(`Server is runnning on port: ${PORT}`);
	console.log(`Access the API at http://localhost:${PORT}`);
})