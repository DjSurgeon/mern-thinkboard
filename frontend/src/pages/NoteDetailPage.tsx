/**
 * pages/NoteDetailPgae.tsx
 */

import { useParams } from "react-router-dom";

const NoteDetailPage = () => {
	const { id } = useParams< { id: string }>();
	return <h1>Note Detail: {id}</h1>
};

export default NoteDetailPage;