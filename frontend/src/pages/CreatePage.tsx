/**
 * @file CreatePage.tsx
 * @brief This component renders the page for creating a new note.
 * @details It provides a form for users to input a title and content, handle form submission and interacts with the API to create a new note.
 * @author Sergio Jiménez de la Cruz
 * @date August 11, 2025
 * @version 1.0.0
 * @license MIT
 */

import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import api from "../api/axios";

/**
 * @brief The page component for creating a new note.
 * @details It contains a form for the note's title and content. Upon submission, it send the data to the API, handles success/error states, and navigates back to the homepage.
 * @returns {JSX.Element} The rendered creation page.
 */
const CreatePage = () => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const handleSubmit = async (e: FormEvent): Promise<void> => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) {
			toast.error("All fields are required")
			return;
		}
		try {
			setLoading(true);
			await api.post('/notes', {
				title,
				content
			});
			toast.success("Note created successfully");
			setLoading(false);
			navigate('/');
		} catch (error) {
			toast.error("Failed to create note");
			console.error("Error creating note", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="card bg-base-100">
						<div className="card-body">
							<h2 className="card-title text-2xl mb-4">Create New Note</h2>
							<form onSubmit={handleSubmit}>
								<div className="form-control mb-4">
									<label htmlFor="title" className="label">
										<span className="label-text">Title</span>
									</label>
									<input
										id="title"
										type="text"
										placeholder="Note Title"
										className="input input-bordered"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required />
								</div>
								<div className="form-control mb-4">
									<label htmlFor="content" className="label">
										<span className="label-text">Content</span>
									</label>
									<textarea
										id="content"
										placeholder="Write your note here..."
										className="textarea textarea-bordered h-32"
										value={content}
										onChange={(e) => setContent(e.target.value)}
										required />
								</div>
								<div className="card-actions justify-end">
									<button type="submit"
										className="btn btn-primary"
										disabled={loading}
										aria-busy={loading}>{loading ? "Creating..." : "Create Note"}</button>
								</div>
							</form>
						</div>
					</div>
					<Link to={"/"} className="btn btn-ghost mb-6">
						<ArrowLeftIcon className="size-4" />
						Back to Notes
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;