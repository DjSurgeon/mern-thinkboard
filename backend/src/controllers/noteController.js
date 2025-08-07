/**
 * @file noteController.js
 * @brief This file contains the controller functions fot the notes API.
 * @details It handles all CRUD operations for notes, including validation and error handling.
 * @author Sergio Jiménez de la Cruz
 * @date August 6, 2025
 * @version 1.0.0
 * @license MIT
 */

const notes = [{
	id: "001",
	title: "test",
	content: "hello world"
}];

/**
 * @brief Handles a GET request to retrieve all notes.
 * @details Retrieves all notes from in-memory array and sends them as a JSON response.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void} Sends a JSON response with all notes.
 */
export const getNotes = async (req, res) => {
	try {
		return res.status(200).json(notes);
	}
	catch (error) {
		console.error(`[getNotes] error fetching notes: ${error.message}`);
		return res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred while fetching notes."
		});
	}
};

/**
 * @brief Handles a GET request to retrieve a single note by ID.
 * @details Searches for a note by its ID and returns it, or sends 404 error if not found.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void} Sends a JSON response with the note or an error message.
 */
export const getNotesById = async (req, res) => {
	try {
		const { id } = req.params;
		const note = notes.find((n) => n.id === id);
		if (!note) {
			return res.status(404).json({
				error: "Not Found",
				message: `Note with '${id}' not found.`
			});
		}
		return res.status(200).json(note);
	} catch (error) {
		console.error(`[getNotesById] error fetching note by ID '${req.params.id}': ${error.message}`);
		return res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred while fetching notes."
		});
	}
};

/**
 * @brief Handles a POST request to create a new note.
 * @details Validates the request body and creates a new note with a unique ID, adding it to the in--memory array.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void} Sends a 201 Created response with the new note.
 */
export const createNote = async (req, res) => {
	try {
		const { title, content } = req.body;
		if (!title || ! content) {
			return res.status(400).json({
				error: "Bad request",
				message: "Title and content are requires fileds."
			})
		}
		const newNote = {
			id: Date.now().toString(),
			title,
			content
		};
		notes.push(newNote);
		return res.status(201).json(newNote);
	} catch (error) {
		console.error(`[createNote] error creating note: ${error.message}`);
		return res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred while creating the note."
		});
	}
};

/**
 * @brief Handles a PUT/PATCH request update an existing note.
 * @details Find a note by ID and updates its title or content with the dara from the request body.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void} Sends a JSON response with the update note.
 */
export const updateNote = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content } = req.body;
		const note = notes.find((n) => n.id === id);
		if (!note) {
			return res.status(404).json({
				error: "Not Found",
				message: `Note with ${id} not found.`
			});
		}
		note.title = title || note.title;
		note.content = content || note.content;
		return res.json(note);
	} catch (error) {
		console.error(`[updateNote] error updating note by ID '${req.params.id}': ${error.message}`);
		return res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred while updating the note."
		});
	}
};

/**
 * @brief Handles a DELETE request to remove a note.
 * @details Finds and remove a note by ID from the in-memory array.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void} Sends a 204 No content response on success.
 */
export const deleteNote = (req, res) => {
	try {
		const { id } = req.params;
		const index = notes.findIndex((n) => n.id === id);
		if (index === -1) {
			return res.status(404).json({
				error: "Not Found",
				message: `Note with ID '${id}' not found.`
			});
		}
		notes.splice(index, 1);
		return res.status(204).end();
	} catch (error) {
		console.error(`[deleteNote] error deleting note by ID '${req.params.id}': ${error.message}`);
		return res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred while deleting the note."
		});
	}
};