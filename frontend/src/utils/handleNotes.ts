/**
 * @file handlenotes.ts
 * @brief This module contains utility functions for handling CRUD operations on notes via the API.
 * @details It provides a centralized and type-safe way to interact with the notes endpoint, including fetching, creating, updating, and deleting notes.
 * @author Sergio Jiménez de la Cruz
 * @date August 14, 2025
 * @version 1.0.1
 * @license MIT
 */

import type { SetStateAction } from "react";
import type { Note } from "../types"
import toast from "react-hot-toast";
import api from "../api/axios";

/**
 * @brief Fetches all notes from the API.
 * @details This function makes and API call to retrieve all notes, handling various states such as loading, rate limiting, and general errors.
 * @param {SetStateAction<Note[]>} setNotes - State setter for the notes array.
 * @param {SetStateAction<boolean>} setLoading - State setter for the loading status.
 * @param {SetStateAction<boolean>} setIsRateLimited - State setter for rate-limit status.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const fetchNotes = async (
	setNotes: (value: SetStateAction<Note[]>) => void,
	setLoading: (value: SetStateAction<boolean>) => void,
	setIsRateLimited: (value: SetStateAction<boolean>) => void
	): Promise<void> => {
	try {
		setLoading(true);
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
 * @brief Fetches a single note by its ID from the API.
 * @details This function retrieves a specific note and handles loagins and potential errors.
 * @param {SetStateAction<Note | null>} setNote - State setter for the individual note object.
 * @param {SetStateAction<boolean>} setLoading - State setter for the loagin status.
 * @param {string | undefined} id - The ID of the note to fetch.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const fetchNote = async (
	setNote: (value: SetStateAction<Note | null>) => void,
	setLoading: (value: SetStateAction<boolean>) => void,
	id?: string,
) : Promise<void> => {
	try {
		if (!id) {
			console.error("No ID provided for fetching note.");
			setNote(null);
			return;
		};
		setLoading(true);
		const res = await api.get<{data: Note}>(`/notes/${id}`);
		setNote(res.data.data);
	} catch (error: unknown) {
		console.error("Error fetching notes:", error);
		setNote(null);
		toast.error("Failed to load note.")
	} finally {
		setLoading(false);
	}
};

/**
 * @brief Deletes a note by its ID from the API.
 * @details It first prompts the user for confirmation via a confirmation dialog.
 * @param {string | undefined} id - The ID of the note to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the note was deleted successfuly, otherwise false.
 */
export const deleteNote = async (id: string | undefined): Promise<boolean> => {
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
		return false;
	}
};

/**
 * @brief Handles the editing of a note.
 * @details This function sends a PUT request to update an existing note.
 * @param {string | undefined} id - The ID of the note to edit.
 * @param {Note} note - The updated note data.
 * @returns {Promise<void>}
 */
export const editNote = async (
	id: string | undefined,
	note?: Partial<Note>,
): Promise<void> => {
	try {
		if (!id) {
			console.error("No ID provided for editing note.");
			toast.error("Failed to update note: ID is missing.");
			return;
		}
		await api.put(`notes/${id}`, note);
	} catch (error: unknown) {
		console.error("Error updating note:", error);
		toast.error("Failed to update note.");
	}
};