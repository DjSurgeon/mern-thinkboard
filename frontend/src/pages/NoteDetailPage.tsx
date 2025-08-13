/**
 * pages/NoteDetailPgae.tsx
 */

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, editNote, fetchNote } from "../utils/handleNotes";
import type { Note } from "../types";
import { formatDate } from "../utils/formatDate";
import { PenSquareIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
	const [note, setNote] = useState<Note | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [saving, setSaving] = useState<boolean>(true);
	const navigate = useNavigate();

	const { id } = useParams< { id: string }>();
	useEffect(() => {
		if (id) {
			fetchNote(setNote, setLoading, id);
		}
		else {
			navigate('/');
		}
	},[id, navigate]);
	const handleDelete = async (e: React.MouseEvent) => {
		e.preventDefault();
		const success = await deleteNote(id);
		if (success) {
			navigate('/');
		}
	};
	const handleSave = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (!note?.title.trim() || !note?.content.trim()) {
      	toast.error("Please add a title or content");
      	return;
    	}
		setSaving(true);
		try {
      		if (id && note) {
        		await editNote(id, note);
        		toast.success("Note updated successfully");
				navigate('/');
      		}
    		} catch (error) {
				console.error("Error", error);
      			toast.error("Failed to update note");
    		} finally {
      		setSaving(false);
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

	return (
		<div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
			{loading && (
			<div className="text-center text-primary py-10">Loading Notes...</div>)}
			<div className="card w-full max-w-2xl bg-base-100 shadow-xl hover:shadow-2-xl transition-all duration-200 border-t-4 border-primary"
				aria-label={`See Note: ${note?.title}`}>
					<div className="card-body">
					<div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note?.title || ''}
                  onChange={handleTitleChange}
                />
              </div>
					<div className="prose max-w-none">
					<div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note?.content || ''}
                  onChange={handleContentChange}
                />
              </div>
					</div>
			<div className="card-actions justify-between items-center mt-auto">
						<time
							className="text-sm text-base-content/60"
							dateTime={note?.createdAt}>
							{formatDate(note?.createdAt)}
							</time>
							<div className="flex gap-2">
							<button
								className="btn btn-ghost btn-xs text-info hover:text-info/80"
								onClick={handleSave}
								aria-label={`Edit note titled: ${note?.title}`}>
								<PenSquareIcon className="size-4" />
							</button>
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
		</div>
	);
};
export default NoteDetailPage;