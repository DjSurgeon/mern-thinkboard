/**
 * @file Notecard.tsx
 * @brief This component renders a single note as a card in the user interface.
 * @details It displaays the note's title, content, creation date, and includes actions for editing and deleting the note.
 * @author Sergio Jiménez de la Cruz
 * @date August 10, 2025
 * @version 1.0.0
 * @license MIT
 */

import { Link } from "react-router-dom";
import { Trash2Icon } from "lucide-react";
import type { NotecardProps } from "../types";
import { formatDate } from "../utils/formatDate";

/**
 * @brief The Notecard component.
 * @details Renders a clickable card for a single note, including its details and actions buttons.
 * The card itslef links to the note's details page, while the edit and delete buttons trigger separate actions.
 * @param {NotecardProps} props - The props object containing the note data and callback functions for actions.
 * @returns {JSX.Element} The rendered note card.
 */
const Notecard = ({ 
	note,
	onDelete,
	}: NotecardProps) => {
		const handleDelete = (e: React.MouseEvent) => {
			e.preventDefault();
			onDelete?.(note._id);
		};
	return (
		<>
		<Link 
			to={`/notes/${note._id}`}
			className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-primary"
			aria-label={`See Note: ${note.title}`}>
			<div className="card-body">
				<h3 className="card-title text-lg font-semibold line-clamp-2">{note.title}</h3>
				<p className="text-base-content/70 line-clamp-3 mb-2">{note.content}</p>
				<div className="card-actions justify-between items-center mt-auto">
					<time
						className="text-sm text-base-content/60"
						dateTime={note.createdAt}>
						{formatDate(note.createdAt)}
						</time>
						<button
							className="btn btn-ghost btn-xs text-error hover:text-error/80"
							onClick={handleDelete}
							aria-label={`Delete note titled: ${note.title}`}>
							<Trash2Icon className="size-4" />
						</button>
					</div>
				</div>
		</Link>
		</>
	);
};

export default Notecard