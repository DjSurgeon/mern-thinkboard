/**
 * @file formatDate.ts
 * @brief This module contains utility functions for handling and formatting dates.
 * @details It provides a centralized, type safe function to format a date string into a human-readable format.
 * @author Sergio Jiménez de la Cruz
 * @date August 14, 2025
 * @version 1.0.1
 * @license MIT
 */

/**
 * @brief Formats an ISO 8601 date string into a locale-specific, human-readable format.
 * @details This function takes a date string, typically from an API response, and formats it to a long date format.
 * It returns an empty string if the input is invalid to prevent rendering errors.
 * @param {string | undefined} dateString - The ISO 8601 date string to be formatted.
 * @returns {string} The formatted date string, or an empty string if the input is invalid.
 */
export const formatDate = (dateString: string | undefined): string => {
	if (!dateString) {
		return '';
	}
	try {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			return '';
		}
		else {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		}
	} catch (error) {
		console.error("Error formating date: ", error);
		return '';
	}
};
