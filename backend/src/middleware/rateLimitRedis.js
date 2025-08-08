/**
 * 
 */

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "../config/upstash.js";

const rateLimit = new Ratelimit({
	redis,
	limiter: Ratelimit.fixedWindow(10, "60 s")
});

export const rateLimitRedis = async (req, res, next) => {
	try {
		const ip = req.ip || req.connection.remoteAddress;
		const { success, limit, remaining, reset } = await  rateLimit.limit(ip);
		if (!success) {
			return res.status(429).json({
				limit,
				remaining,
				reset,
				message: "Too Many Request."
			})
		}
	} catch (error) {
		console.error(`[rateLimitRedis] rate limit error. ❌`);
		next(error);
	}
	next();
}; 