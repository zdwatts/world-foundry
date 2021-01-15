import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const DocumentEditor = ({ authenticate }) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [directories, setDirectories] = useState([]);
	const [parentDirectory, setParentDirectory] = useState([]);
	const history = useHistory();

	const apiKey = process.env.REACT_APP_TINY_MCE;

	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/directories/all");
			const directoriesArray = res.data.directories;
			setDirectories(directoriesArray);
		})();
	}, []);

	const titleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleEditorChange = (content, editor) => {
		setBody(content);
	};

	const parentDirectoryChange = (e) => {
		setParentDirectory(e.target.value);
	};

	const addDocument = async (e) => {
		e.preventDefault();

		const response = await axios.post("/api/documents/", {
			title,
			body,
			"parent-directory": parentDirectory,
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
				<form onSubmit={addDocument}>
					<div>
						<label>Document Title</label>
						<input type="text" name="title" required onChange={titleChange} />
					</div>
					<div>
						<label>Parent Directory: </label>
						<select
							required
							name="parent-directory"
							onChange={parentDirectoryChange}
						>
							{directories.map((directory) => (
								<option key={directory.id}>{directory.name}</option>
							))}
						</select>
					</div>
					<Editor
						required
						apiKey={apiKey}
						plugins="wordcount wordcount fullscreen image preview"
						onEditorChange={handleEditorChange}
					/>
					<button type="submit">Add Document</button>
				</form>
			</div>
		</div>
	);
};

export default DocumentEditor;
