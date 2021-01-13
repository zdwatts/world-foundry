import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const DocumentEditor = ({ authenticate }) => {
	const [title, setTitle] = useState("");

	const apiKey = process.env.REACT_APP_TINY_MCE;

	const titleChange = (e) => {
		setTitle(e.target.value);
	};

	return (
		<div className="document-wrapper">
			<div>
				<form>
					<div>
						<label>Document Title</label>
						<input type="text" name="title" required onChange={titleChange} />
					</div>
					<Editor
						apiKey={apiKey}
						plugins="wordcount wordcount fullscreen image preview"
					/>
				</form>
			</div>
		</div>
	);
};

export default DocumentEditor;
