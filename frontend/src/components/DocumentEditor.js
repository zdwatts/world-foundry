import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const DocumentEditor = ({ authenticate }) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [directories, setDirectories] = useState([]);
	const history = useHistory();

	const apiKey = process.env.REACT_APP_TINY_MCE;

	const titleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleEditorChange = (content, editor) => {
		setBody(content);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await axios.post("/api/documents/", {
			title,
			body,
		});

		if (response.ok) {
			const data = await response.json();
			const documentId = data.id;
			history.push(`/documents/${documentId}`);
		}
	};

	return (
		<div className="document-wrapper">
			<div>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Document Title</label>
						<input type="text" name="title" required onChange={titleChange} />
					</div>
					<div>
						<label>Parent Directory</label>
						<input />
					</div>
					<Editor
						apiKey={apiKey}
						plugins="wordcount wordcount fullscreen image preview"
						onEditorChange={handleEditorChange}
					/>
				</form>
			</div>
		</div>
	);
};

export default DocumentEditor;
