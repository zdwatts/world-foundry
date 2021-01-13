import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Document = ({ authenticate }) => {
	const [document, setDocument] = useState("");

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			const response = await axios.get(`/api/documents/${id}`);
			const data = response.data;
			console.log(data);
		})();
	});

	return (
		<div>
			<h1>Document</h1>
		</div>
	);
};

export default Document;
