/**
 * @file handlenotes.ts
 * @brief This modulke contains utility functions for handling CRUD operations on notes via the API.
 * @details It provides a centralized and type-safe way to interact with the notes endpoint, including fetching, creating, updating, and deleting notes.
 * @author Sergio Jiménez de la Cruz
 * @date August 12, 2025
 * @version 1.0.0
 * @license MIT
 */

import toast from "react-hot-toast";
import api from "../api/axios";
import type { SetStateAction } from "react";
import type { Note } from "../types"

/**
 * @brief Fetches all notes from the API.
 * @details This function makes and API call to retrieve all notes, handling various states such as loading, rate limiting, and general errors.
 * @param {SetStateAction<boolean>} setIsRateLimited - State setter for rate-limit status.
 * @param {SetStateAction<Note[]>} setNotes - State setter for the notes array.
 * @param {SetStateAction<boolean>} setLoading - State setter for the loading status.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const fetchNotes = async (
	setIsRateLimited: (value: SetStateAction<boolean>) => void, 
	setNotes: (value: SetStateAction<Note[]>) => void, 
	setLoading: (value: SetStateAction<boolean>) => void
	): Promise<void> => {
	try {
		const res = await api.get<{data: Note[]}>('/notes');
		setNotes(res.data.data);
		setIsRateLimited(false);
	} catch (error: unknown) {
		console.error("Error fetching notes:", error);
		if (error.response?.status === 429) {
			setIsRateLimited(true);
		} else {
			toast.error("Failed to load notes.");
		}
	} finally {
		setLoading(false);
	}
};

/**
 * @brief Deletes a note by its ID from the API.
 * @details Before deleting, it promps the user confirmation.
 * @param {string} id - The ID of the note to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the note was deleted successfuly, otherwise false.
 */
export const deleteNote = async (id: string): Promise<boolean> => {
	const isConfirmed = window.confirm("Are you sure you want to delete this note?");
	if (!isConfirmed) {
		return false;
	}
	try {
		await api.delete(`notes/${id}`);
		toast.success("Note deleted successfully.");
		return true;
	} catch (error) {
		console.error("Error deleting note:", error);
		toast.error("Failed to delete note.");
		return true;
	}
};

/**
 * @brief Handles the editing of a note.
 * @param {string} id - The ID of the note to edit.
 * @returns {Promise<void>}
 */
export const editNote = async (id: string): Promise<void> => {
	//TODO edition Page
	console.log(`Editing note with ID: ${id}`);
};