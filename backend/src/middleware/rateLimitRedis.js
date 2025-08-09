/**
 * @file rateLimitRedis.js
 * @brief This module provides a distributed rate-limiting middleware using Upstash Redis.
 * @details It implements a fixed window rate-limiting strategy to protect API endpoints from excessive requests, preventing abuse and ensuring stability.
 * @author Sergio Jiménez de la Cruz
 * @date August 9, 2025
 * @version 1.0.0
 * @license MIT
 * @see {@link ../config/upstash.js} for the Redis client instance.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "../config/upstash.js";

/**
 * @brief Initializes a new distributed rate limiter using a fixed window strategy.
 * @details This limiter allows 10 requests per minute (60 seconds) for each unique IP address.
 * It is backed by the Upstash Redis client for a robust and scalable solution.
 * @type {Ratelimit}
 */
const rateLimit = new Ratelimit({
	redis,
	limiter: Ratelimit.fixedWindow(10, "60 s")
});

/**
 * @brief Middleware function to enforce rate limits on incoming requests.
 * @details It identifies the client by their IP address and checks if their request count exceeds the defined limit within the fixed window. If the limit is exceeded, it sends a 429 status code.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {void} Sends a 429 response if rate limit exceeded, otherwise continues to the next middleware.
 */
export const rateLimitRedis = async (req, res, next) => {
	try {
		const ip = req.ip || req.connection.remoteAddress;
		const { success, limit, remaining, reset } = await  rateLimit.limit(ip);
		if (!success) {
			return res.status(429).json({
				error: "Too Many Requests.",
				message: "Rate limit exceeded. Please try again later. ❌",
				details: {
					limit,
					remaining,
					reset
				}
			});
		}
		next();
	} catch (error) {
		console.error(`[rateLimitRedis] rate limit error: ${error.message} ❌`);
		next(error);
	}
}; 