import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "./styles/DocumentEditor.css";

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

		const response = await fetch("/api/documents", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				body,
				"parent-directory": parentDirectory,
			}),
		});

		if (response.ok) {
			const data = await response.json();
			const documentId = data.id;
			history.push(`/documents/${documentId}`);
		}
	};

	return (
		<div className="content-wrapper">
			<div className="form-wrapper">
				<form onSubmit={addDocument}>
					<div className="title-wrapper">
						<label>Document Title</label>
						<input type="text" name="title" required onChange={titleChange} />
					</div>
					<div className="parent-directory-wrapper">
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
					<button type="submit" className="submit-button">
						Add Document
					</button>
				</form>
			</div>
		</div>
	);
};

export default DocumentEditor;
