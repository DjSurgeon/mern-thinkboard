/**
 * @file db.js
 * @brief This module is responsible for establishing a connection to the MongoDB database.
 * @details It uses Mongoose to connect to the database, ensuring the connection is robust with timeout configurations.
 * @author Sergio Jiménez de la Cruz
 * @date August 7, 2025
 * @version 1.0.0
 * @license MIT
 * @see {@link ../app.js} for where this function is called.
 */

import mongoose from "mongoose"

/**
 * @brief Asynchronously connects to the MongoDB database.
 * @details This function retrieves the MongoDB URI from environment variables and uses Mongoose to connect.
 * It includes robust error handling and server timeout settings for better reliability.
 * @returns {Promise<void>} A promise that resolves when te connection is successful.
 */
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			serverSelectionTimeoutMS: 30000,
			socketTimeoutMS: 45000
		});
		console.log(`Mongo DB connected: ${conn.connection.host} ✅`);
	} catch (error) {
		console.error(`Mongo DB connection error: ${error.message} ❌`);
		process.exit(1);
	}
};

export default connectDB;