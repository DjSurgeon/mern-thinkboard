/**
 * @file NotesNotFound.tsx
 * @brief This component displays a message when no notes are available.
 * @details It provides a user-friendly message and a clear call to action to create the first note.
 * It improves the user experience by guiding the during an empty state.
 * @author Sergio Jiménez de la Cruz
 * @date August 14, 2025
 * @version 1.0.1
 * @license MIT
 */

import type { JSX } from "react";
import { NotebookPenIcon } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * @details This component provides a clear visual and textual message to the user, along with a call to action button to navigate to the note creation page.
 * @return {JSX.Element} The rendered UI component for the "no notes" state.
 */
const NotesNotFound = (): JSX.Element => {
	return (
		<div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
			<div className="bg-primary/10 rounded-full p-8">
			<NotebookPenIcon className="size-8 text-primary"/>
			</div>
			<h3 className="text-2xl font-bold">No notes yet!</h3>
			<p className="text-base-content/70">
			Ready to organize your thoughts? Create your first note!</p>
			<Link to={'/create'} className="btn btn-primary">
			Create your first note
			</Link>
		</div>
	);
};

export default NotesNotFound;