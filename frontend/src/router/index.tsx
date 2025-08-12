/**
 * @file router/index.tsx
 * @brief This module defines the main routing configurastion for the application.
 * @details It uses `react-router-dom` to map different URL path to their corresponding React components, including dynamic routes and a cath all route for handling 404 errors.
 * @author Sergio Jiménez de la Cruz
 * @date August 10, 2025
 * @version 1.0.0
 * @license MIT
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import NoteDetailPage from "../pages/NoteDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

/**
 * @brief The main router component for the application.
 * @details This component sets up the client-side routing.
 * The `<BrowserRouter>` provides the routing context, and `<Routes>` defines the mapping of URL paath to specific components.
 * @returns {JSX.Element} The configured router component.
 */
const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/create" element={<CreatePage />} />
				<Route path="/notes/:id" element={<NoteDetailPage />} />
				<Route path="/*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
