/**
 * @file rateLimit.js
 * @brief This module provides a configurable rate-limiting middleware for the Express application.
 * @details It defines and exports a rate limiter to protect the API from excessive request, preventing abuse and potential denial-of-service attacks.
 * @author Sergio Jiménez de la Cruz
 * @default August 8, 2025
 * @version 1.0.0
 * @license MIT
 */

import rateLimit from 'express-rate-limit';

const RATE_LIMIT_WINDOW = process.env.RATE_LIMIT_WINDOW || 6000000;
const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX || 25;

/**
 * @brief Middleware that limits repeated request to the API.
 * @details This limiter restricts each IP address to a maximum number of request within a defined time window.
 * It's crucial for preventing abuse and ensuring API stability.
 * @type {Function}
 */
export const apiLimiter = rateLimit({
	windowMs: RATE_LIMIT_WINDOW,
	max: RATE_LIMIT_MAX,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		status: 'fail',
		statusCode: 429,
		error: "Too Many Requests",
		message: 'Rate limit exceeded. Please try again later.'
	},
});