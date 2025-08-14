/**
 * @file NoteDetailPgae.tsx
 * @brief This component displays the details of a single note and allows for editing and deletion.
 * @details It fetches a specific note by its ID from the API, provides aa form for editing, and includes buttons for saving changes and deleting the note.
 * @author Sergio Jiménez de la Cruz
 * @date August 14, 2025.
 * @version 1.0.1
 * @license MIT
 */

import { useEffect, useState, type JSX } from "react";
import type { Note } from "../types";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteNote, editNote, fetchNote } from "../utils/handleNotes";
import { formatDate } from "../utils/formatDate";
import { PenSquareIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
import NotesNotFound from "../components/NotesNotFound";

/**
 * @brief The page component for viewing and editing aa single note.
 * @details It fetches and displays the note's data based on the URL parameter.
 * Users can update the title and content or delete the note from this page.
 * @returns {JSX.Element | null} The rendered note detail page, or null while loading.
 */
const NoteDetailPage = (): JSX.Element => {
	const [note, setNote] = useState<Note | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const navigate = useNavigate();

	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		if (id) {
			fetchNote(setNote, setLoading, id);
		}
		else {
			navigate('/');
		}
	}, [id, navigate]);
	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		e.preventDefault();
		const success = await deleteNote(id);
		if (success) {
			navigate('/');
		}
	};
	const handleSave = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		e.preventDefault();
		if (!note?.title.trim() || !note?.content.trim()) {
			toast.error("Please add a title or content");
			return;
		}
		try {
			if (id && note) {
				await editNote(id, note);
				toast.success("Note updated successfully");
				navigate('/');
				setIsEditing(false);
			}
		} catch (error) {
			console.error("Error", error);
			toast.error("Failed to update note.");
		} finally {
			setIsEditing(false);
		}
	};
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (note) {
			setNote({ ...note, title: e.target.value });
		}
	};
	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (note) {
			setNote({ ...note, content: e.target.value });
		}
	};
	if (loading) {
		return (
			<div className="flex justify-center, items-center, h-screen bg-base-200">
				<span className="loading loading-spinner loading-lg text-primary" aria-label="Loading notes"></span>
			</div>
		);
	}
	if (!note) {
		return (
			<div className="flex justify-center items-center h-screen bg-base-200">
				<NotesNotFound />
			</div>
		);
	}
	return (
		<div className="min-h-screen bg-base-200 flex flex-col mx-auto px-4 py-8">
			<div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl hover:shadow-2-xl transition-all duration-200 border-t-4 border-primary"
				aria-label={`See Note: ${note.title}`}>
				<div className="card-body">
					<div className="form-control mb-4">
						<label className="label" htmlFor="note-title">
							<span className="label-text">Title</span>
						</label>
						<input
							id="note-title"
							type="text"
							placeholder="Note title"
							className="input input-bordered"
							value={note.title}
							onChange={handleTitleChange}
							readOnly={!isEditing}
						/>
					</div>
					<div className="prose max-w-none">
						<div className="form-control mb-4">
							<label className="label" htmlFor="note-content">
								<span className="label-text">Content</span>
							</label>
							<textarea
								id="note-content"
								placeholder="Write your note here..."
								className="textarea textarea-bordered h-32"
								value={note.content}
								onChange={handleContentChange}
								readOnly={!isEditing}
							/>
						</div>
					</div>
					<div className="card-actions justify-between items-center mt-auto">
						<time
							className="text-sm text-base-content/60"
							dateTime={note?.createdAt}>
							{note.createdAt ? formatDate(note.createdAt) : 'No date available'}
						</time>
						<div className="flex gap-2">
							{!isEditing ? (
									<button
										className="btn btn-ghost btn-xs text-info hover:text-info/80"
										onClick={() => setIsEditing(true)}
										aria-label={`Editing note titled: ${note?.title}`}>
										<PenSquareIcon className="size-4" />
									</button>
								) : (
									<button
										className="btn btn-ghost btn-xs text-info hover:text-info/80"
										onClick={handleSave}
										aria-label={`Save changes for note titled: ${note?.title}`}>
										Save
									</button>
								)
							}
							<button
								className="btn btn-ghost btn-xs text-error hover:text-error/80"
								onClick={handleDelete}
								aria-label={`Delete note titled: ${note?.title}`}>
								<Trash2Icon className="size-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<Link to={"/"} className="btn btn-ghost mb-6">
				<ArrowLeftIcon className="size-4" />
				Back to Notes
			</Link>
		</div>
	);
};
export default NoteDetailPage;