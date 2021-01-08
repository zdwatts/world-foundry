import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const DocumentEditor = () => {
	const apiKey = process.env.REACT_APP_TINY_MCE;

	return (
		<div>
			<Editor apiKey={apiKey} />
		</div>
	);
};

export default DocumentEditor;
