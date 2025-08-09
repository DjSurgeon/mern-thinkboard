/**
 * router/index.tsx
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import NoteDetailPage from "../pages/NoteDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/create" element={<CreatePage />} />
			<Route path="/notes/:id" element={<NoteDetailPage />} />
			<Route path="/*" element={<NotFoundPage />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
