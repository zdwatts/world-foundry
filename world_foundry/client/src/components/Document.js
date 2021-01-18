import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import UpdateDocument from "./UpdateDocument";
import "./styles/Document.css";

const Document = ({ authenticate }) => {
	const [document, setDocument] = useState("");
	const [showEditor, setShowEditor] = useState(false);
	const history = useHistory();

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			const response = await axios.get(`/api/documents/${id}`);
			const data = response.data;
			setDocument(data.document);
		})();
	}, [id]);

	const title = document.title;
	const body = document.body;

	const deleteDocument = async (id) => {
		await axios.delete(`/api/documents/${id}`);
		history.push("/directories");
	};

	return (
		<div className="content-wrapper">
			{showEditor ? (
				<UpdateDocument title={title} body={body} />
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
