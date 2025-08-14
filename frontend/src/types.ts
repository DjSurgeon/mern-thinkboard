/**
 * @file types.ts
 * @brief This file defines the TypeScript interface used throughout the aplication.
 * @details It provides type definitions for data structures line `Note` and for components props, ensuring strong typing and improving code quality.
 * @author Sergio Jiménez de la Cruz
 * @date August 13, 2025
 * @version 1.0.1
 * @license MIT
 */

/**
 * @interface Note
 * @brief Defines the structure of a Note object.
 * @details This interface represents a note document as stored in the database.
 * The `_id` field is always present after creation.
 * The optional fields are typically managed by the database.
 * @property {string} _id - The unique identifier of the note.
 * @property {string} title - The title of the note.
 * @property {string} content - The main body content of the note.
 * @property {string} [createdAt] - The creation date of the note.
 * @property {string} [updatedAt] - The las update date of the note.
 */
export interface Note {
	_id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

/**
 * @interface NotecardProps
 * @brief Defines the props for the Notecard component.
 * @property {Note} note -The note object to be displayed in the card.
 * @property {(id: string) => void} onDelete - Optional callback function to handle the delete action.
 * @property {(id: string) => void} onEdit - Optional callback function to handle the edit action.
 */
export interface NotecardProps {
	note: Note;
	onDelete?: (id: string) => void;
	onEdit?: (id: string) => void;
}

/**
 * @interface RateLimitedUIProps
 * @brief Defines the props for the RateLimitedUI component.
 * @property {string} [title] - Optional title for the message. Defaults to "Rate Limit Reached".
 * @property {string} [message] - Optional main message body. Defaults to "You've made too many requests in a short period. Please wait a moment."
 * @property {string} [callToAction] - Optional call to action message. Defaults to "Try again in a few seconds for the best experience."
 */
export interface RateLimitedUIProps {
	title?: string;
	message?: string;
	callToAction?: string;
}