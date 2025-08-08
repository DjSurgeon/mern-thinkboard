/**
 * @file notesRouter.js
 * @brief This file defines the API routes for handling note-related requests.
 * @details It serves as the routing layer, mapping HTTP request to the appropriate controller functions for CRUD operations.
 * @author Sergio Jiménez de la Cruz
 * @date August 6, 2025
 * @version 1.0.0
 * @license MIT
 * @see {@link ../controller/notesController.js} for the busines logic associated with these routes.
 */

import express from 'express';
import {
	getNotes,
	getNotesById,
	createNote,
	updateNote,
	deleteNote,
} from '../controllers/notesController.js'

const router = express.Router();

/**
 * @brief GET a route to retrieve all notes.
 * @details Handles request to fetch a list of all notes.
 * @name GET /
 * @function
 */
router.get("/", getNotes);

/**
 * @brief GET a route to retrieve a single note by ID.
 * @details Handles request to fetch a specific note using a URL parameter for its ID.
 * @name GET /:id
 * @function
 */
router.get("/:id", getNotesById);

/**
 * @brief POST route to create a new note.
 * @details Handles request to create a new note based on the data in the request body.
 * @name POST /
 * @function
 */
router.post("/", createNote);

/**
 * @brief PUT route to update a note by ID.
 * @details Handles request to update an existing note using its ID and data from the request body.
 * @name PUT /:id
 * @function
 */
router.put("/:id", updateNote);

/**
 * @brief DELETE route to remove a note by ID.
 * @details Handles request to delete a specific note using its ID.
 * @note DELETE /:id
 * @function
 */
router.delete("/:id", deleteNote);

export default router;
