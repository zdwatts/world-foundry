import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

const Document = ({ authenticate }) => {
	const [document, setDocument] = useState("");

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			const response = await axios.get(`/api/documents/${id}`);
			const data = response.data;
			setDocument(data.document);
		})();
	}, [id]);

	return (
		<div className="document-wrapper">
			<div className="title-wrapper">
				<h1>{document.title}</h1>
			</div>
			<div className="body-wrapper">
				{document.body && parse(document.body)}
			</div>
		</div>
	);
};

export default Document;
