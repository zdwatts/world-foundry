import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Document = ({ authenticate }) => {
	const [document, setDocument] = useState("");

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			const response = await axios.get(`/apidocuments/${id}`);
			const data = response.data;
		})();
	});

	return <div></div>;
};

export default Document;
