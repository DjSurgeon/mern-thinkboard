/**
 * pages/HomePage.tsx
 */

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Notecard from "../components/Notecard";
import RateLimitedUI, {  } from "../components/RateLimitedUI";

const HomePage = () => {
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const res = await axios.get("http://localhost:3000/api/notes");
				setNotes(res.data.data);
				setIsRateLimited(false);
			} catch (error) {
				console.error("Error fetching notes");
				if (error.response?.status === 429) {
					setIsRateLimited(true);
				} else {
					toast.error("Failed to load notes");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchNotes();
	},[])
	return (
		<div className="min-h-screen">
		<Navbar />
		{isRateLimited && <RateLimitedUI />}
		<div className="max-w-7 mx-auto p-4 mt-6">
			{loading && <div className="text-center text-primary py-10">Loading Notes...</div>}
			{notes.length > 0 && !isRateLimited && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{notes.map((note) => (
						<Notecard key={note._id} note={note} />
					))}
				</div>
			)}
		</div>
		</div>
		);
};

export default HomePage;