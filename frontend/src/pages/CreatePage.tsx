/**
 * 
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import api from "../api/axios";

const CreatePage = () => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) {
			toast.error("All fields are required")
			return ;
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
									required/>
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
									required/>
								</div>
								<div className="card-actions justify-end">
									<button type="submit" className="btn btn-primary" disabled={loading} aria-busy={loading}>{loading ? "Creating..." : "Create Note"}</button>
								</div>
							</form>
						</div>
					</div>
					<Link to={"/"} className="btn btn-ghost mb-6">
					<ArrowLeftIcon className="size-4"/>
					Back to Notes
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;