import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Document from "./Document";
import "./styles/Document.css";

const UpdateDocument = ({ title, body }) => {
	const [newTitle, setNewTitle] = useState(title);
	const [newBody, setNewBody] = useState(body);
	const [showEditor, setShowEditor] = useState(false);

	const { id } = useParams();

	const apiKey = process.env.REACT_APP_TINY_MCE;

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
		<div>
			{showEditor ? (
				<Document />
			) : (
				<div className="form-wrapper">
					<form onSubmit={handleEdit}>
						<div className="title-wrapper">
							<label>New Title</label>
							<input
								type="text"
								value={newTitle}
								onChange={handleTitleChange}
							/>
						</div>
						<Editor
							value={newBody}
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
			)}
		</div>
	);
};

export default UpdateDocument;
