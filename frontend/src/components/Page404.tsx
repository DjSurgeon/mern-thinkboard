/**
 * @file Page404.tsx
 * @brief This component renders a user-friendly 404 "Not Found" error page.
 * @details It provides a cleaaar visual and textual message, along with a prominent call to action to return to the homepage, improving the user experience during a routing error.
 * @author Sergio Jiménez de la Cruz
 * @date August 14, 2025
 * @version 1.0.1
 * @license MIT
 */

import type { JSX } from "react"
import { House } from "lucide-react";
import { Link } from "react-router-dom";
import image from "../assets/everything.jpg";

/**
 * @brief The component to be displayed for 404 errors.
 * @details This component provides a clear vial and textual message to the user when a page is not found.
 * It includes a prominent image and a button to navigate back to the homepage.
 * @returns {JSX.Element} The rendered 404 error page.
 */
const Page404 = (): JSX.Element => {
	return (
		<>
			<div className="min-h-screen flex flex-col items-center justify-center text-primary">
				<h1 className="text-4xl font-extrabold mb-2 p-4">Oops! Something went wrong!</h1>
				<img className="size-48 rounded-xl p-8" src={image} alt="404 Error" />
				<p className="text-xl text-base-content/70 mb-8 p-4">The page you're looking for doesn't exist.</p>
				<h3 className="text-xl p-8">404 Error</h3>
				<Link to={'/'} aria-label="Go to Homepage">
					<div className="btn btn-primary">
						<House className="size-6" />
						<span>Go Home</span>
					</div>
				</Link>
			</div>
		</>
	);
}

export default Page404;