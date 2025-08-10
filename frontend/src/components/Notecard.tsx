/**
 * 
 */

import { Link } from "react-router-dom";

const Notecard = ({note}) => {
	return (
		<>
			<div>{note._id}</div>
			<div>{note.title}</div>
			<div>{note.content}</div>
		</>
	);
};

export default Notecard