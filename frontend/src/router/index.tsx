/**
 * router/index.tsx
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import NoteDetailPage from "../pages/NoteDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../components/Layout";

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout> <HomePage /> </Layout>} />
			<Route path="/create" element={<Layout> <CreatePage /> </Layout>} />
			<Route path="/notes/:id" element={<Layout><NoteDetailPage /></Layout>} />
			<Route path="/*" element={<Layout><NotFoundPage /></Layout>} />
		</Routes>
	</BrowserRouter>
);

export default Router;
