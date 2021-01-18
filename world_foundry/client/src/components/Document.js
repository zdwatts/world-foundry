import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import parse from "html-react-parser";
import "./styles/Document.css";

const Document = ({ authenticate }) => {
	const [document, setDocument] = useState("");
	const [showEditor, setShowEditor] = useState(false);
	const history = useHistory();

	const { id } = useParams();

	const apiKey = process.env.REACT_APP_TINY_MCE;

	useEffect(() => {
		(async () => {
			const response = await axios.get(`/api/documents/${id}`);
			const data = response.data;
			setDocument(data.document);
		})();
	}, [id]);

	const [newTitle, setNewTitle] = useState(document.title);
	const [newBody, setNewBody] = useState(document.body);

	const deleteDocument = async (id) => {
		await axios.delete(`/api/documents/${id}`);
		history.push("/directories");
	};

	const handleTitleChange = (e) => {
		setNewTitle(e.target.value);
	};

	const handleEditorChange = (content, editor) => {
		setNewBody(content);
	};

	const handleEdit = async () => {
		const request = { title: newTitle, body: newBody };
		await axios.put(`/api/documents/${id}`, request);
	};

	return (
		<div className="content-wrapper">
			{showEditor ? (
				<div className="form-wrapper">
					<form onSubmit={handleEdit(document.id)}>
						<div className="title-wrapper">
							<label>New Title</label>
							<input
								type="text"
								value={document.title}
								onChange={handleTitleChange}
							/>
						</div>
						<Editor
							value={document.body}
							apiKey={apiKey}
							plugins="wordcount wordcount fullscreen image preview"
							onEditorChange={handleEditorChange}
						/>
						<div className="buttons-wrapper">
							<button type="submit" className="buttons">
								Save
							</button>
						</div>
					</form>
					<div className="buttons-wrapper">
						<button
							className="buttons"
							onClick={() => setShowEditor(!showEditor)}
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<div className="document-wrapper">
					<div className="title-wrapper">
						<h1>{document.title}</h1>
					</div>
					<div className="body-wrapper">
						{document.body && parse(document.body)}
					</div>
					<div className="buttons-wrapper">
						<button
							className="buttons"
							onClick={() => deleteDocument(document.id)}
						>
							Delete
						</button>
						<button
							className="buttons"
							onClick={() => setShowEditor(!showEditor)}
						>
							Edit
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Document;
