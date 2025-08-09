/**
 * @file upstash.js
 * @brief This module initializes and configures the Redis client using Upstash.
 * @details It provides a centralized and secure way to manage the Redis connection by using environment variables for the url and token.
 * @author Sergio Jiménez de la Cruz
 * @date August 9, 2025
 * @version 1.0.0
 * @license MIT
 */

import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @brief Initializes a new Redis client instance.
 * @details The client is configured with connection details from environment variables to ensure security and portasbility. It is ready to be used for caching operations.
 * @type {Redis}
 */
export const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
	throw new Error('Upstash Redis credentials are missing in environment variables.');
}
