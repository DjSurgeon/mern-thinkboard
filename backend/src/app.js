/**
 * @file app.js
 * @brief This is the main entry point for the Express application.
 * @details It initializes the Express server and defines a basic root endpoint.
 * @author Sergio Jiménez de la Cruz
 * @data August 6, 2025
 * @version 1.0.0
 * @license MIT
 */

import dotenv from "dotenv";
import express from "express";
import notesRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
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