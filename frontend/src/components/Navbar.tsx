/**
 * @file Navbar.tsx
 * @brief This component renders the main navigation bar of the application.
 * @details It includes the application's logo and a button to create a new note, providing a consistent and accessible navigation header.
 * @author Sergio Jiménez de la Cruz
 * @date August 14, 2025
 * @version 1.0.1
 * @license MIT
 */

import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import type { JSX } from "react";

/**
 * @brief The navigation bar component for the application.
 * @details It features the app's logo/title, which links to the homepage, and a primary button for creating a new note.
 * @returns {JSX.Element} The rendered navigation bar.
 */
const Navbar = (): JSX.Element => {
	return (
		<header className="bg-base-300 border-b border-base-content/10">
			<div className="mx-auto max-w-6xl p-4">
				 <div className="flex items-center justify-between">
					<Link to={"/"} aria-label="Go to homepage">
						<h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">ThinkBoard</h1>
					</Link>
					<nav className="flex items-center gap-4">
						<Link to={"/create"} className="btn btn-primary" aria-label="Create new note">
						<PlusIcon className="size-5"/>
						<span className="hidden sm:inline">New Note</span>
						</Link>
					</nav>
				 </div>
			</div>
		</header>
	);
};

export default Navbar;