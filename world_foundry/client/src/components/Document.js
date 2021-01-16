import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import parse from "html-react-parser";

const Document = ({ authenticate }) => {
	const [document, setDocument] = useState("");
	const [showEditor, setShowEditor] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newBody, setNewBody] = useState("");
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

	const deleteDocument = async (id) => {
		await axios.delete(`/api/documents/${id}`);
		history.push("/directories");
	};

	const handleEdit = async (id) => {
		const request = { title: newTitle, body: newBody };
		await axios.put(`/api/documents/${id}`);
	};

	return (
		<>
			{showEditor ? (
				<div>
					<form>
						<Editor
							value={newBody}
							apiKey={apiKey}
							plugins="wordcount wordcount fullscreen image preview"
						/>
						<button type="submit" onSubmit={handleEdit(document.id)}>
							Save Changes
						</button>
					</form>
					<button onClick={() => setShowEditor(!showEditor)}>Cancel</button>
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
						<button onClick={() => deleteDocument(document.id)}>
							Delete Document
						</button>
						<button onClick={() => setShowEditor(!showEditor)}>
							Edit Document
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Document;
