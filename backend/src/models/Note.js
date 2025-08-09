/**
 * @file Note.js
 * @brief This file defines the Mongoose schema and model for a Note document.
 * @details The schema includes validation rules for the title and content field and automatic timestamp management.
 * @author Sergio Jiménez de la Cruz
 * @date August 7, 2025
 * @version 1.0.0
 * @license MIT
 * @see {@link ../controllers/notesController.js} for where this model is used.
 */

import mongoose from "mongoose";

/**
 * @brief Mongoose schema for the 'Note' collection
 * @details This schema defines structure and validation rules for a note.
 * It includes fields for the title, content, and Mongoose's built-in timestamps.
 */
const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required."],
			trim: true,
			minlength: [3, "Title must be at least 3 characters long."],
			maxlength: [100, "Title cannot exceed 100 characters."]
		},
		content: {
			type: String,
			required: [true, "Content is required."],
			trim: true
		},
	},
	{
		timestamps: true,
	}
);

/**
 * @brief Mongoose Model for the 'Note' collection.
 * @details This model provides an interface for interacting with the 'notes' collection in MongoDB.
 * It is created from noteSchema and named 'Note'.
 */
const Note = mongoose.model("Note", noteSchema);

export default Note;