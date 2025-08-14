/**
 * @file HomePage.tsx
 * @brief This component renders the main homepage of the application, displaying a list of notes.
 * @details It handles fetching notes from the API, managing loading states, and displaying a rate-limit warning or an empty state.
 * @author Sergio Jiménez de la Cruz
 * @date August 13, 2025
 * @version 1.0.1
 * @license MIT
 */

import { useEffect, useState, type JSX } from "react";
import type { Note } from "../types";
import Navbar from "../components/Navbar";
import Notecard from "../components/Notecard";
import RateLimitedUI from "../components/RateLimitedUI";
import NotesNotFound from "../components/NotesNotFound";
import { fetchNotes, deleteNote, editNote } from "../utils/handleNotes";

/**
 * @brief The main page component that displays all notes.
 * @details It fetches the notes from the backend on initial render provides functionality to view, edit, and delete notes. It also handles various UI states such as loading and rate-limiting.
 * @returns {JSX.Element} The homepage layout with notes or status messages.
 */
const HomePage = (): JSX.Element => {
	const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchNotes(setNotes, setLoading, setIsRateLimited);
	},[])
	const handleDelete = async (id: string): Promise<void> => {
		const success = await deleteNote(id);
		if (success) {
			setNotes(notes.filter(note => note._id !== id));
		}
	};
	const handleEdit = async (id: string):Promise<void> => {
		editNote(id);
	};
	if (loading) {
		return (
			<div className="flex justify-center, items-center, h-screen bg-base-200">
				<span className="loading loading-spinner loading-lg text-primary" aria-label="Loading notes"></span>
			</div>
		);
	}
	return (
		<div className="min-h-screen">
		<Navbar />
		{isRateLimited && <RateLimitedUI />}
		<div className="max-w-7xl mx-auto p-4 mt-6">
			{!isRateLimited && notes.length === 0 && (
				<NotesNotFound />
			)}
			{!isRateLimited && notes.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{notes.map((note) => (
						<Notecard 
						key={note._id} 
						note={note}
						onDelete={handleDelete}
						onEdit={handleEdit} />
					))}
				</div>
			)}
		</div>
		</div>
		);
};

export default HomePage;