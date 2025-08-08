/**
 * @file db.js
 * @brief This module is responsible for establising a connection to the MongoDB database.
 * @details It uses Moongose to connect to the database, ensuring the connection is robust with timeout configurations.
 * @author Sergio Jiménez de la Cruz
 * @date August 7, 2025
 * @version 1.0.0
 * @license MIT
 * @see {@link ../app.js} for where this function is called.
 */

import mongoose from "mongoose";

/**
 * @brief Asynchronously connects to the MongoDB database.
 * @details This function retrieves the MongoDB URI from enviroment variables and uses Mongoose to connect.
 * It incluides robust error handling and server timeout settins for better reliability.
 * @returns {Promise<void>} A promise that resolves when te connection is successful.
 */
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000
		});
		console.log(`Mongo DB connected: ${conn.connection.host} ✅`);
	} catch (error) {
		console.error(`Mongo DB connectionn error: ${error.message} ❌`);
		process.exit(1);
	}
};

export default connectDB;