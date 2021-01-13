import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const DocumentEditor = ({ authenticate }) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const apiKey = process.env.REACT_APP_TINY_MCE;

	const titleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleEditorChange = (content, editor) => {
		setBody(content);
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
						onEditorChange={handleEditorChange}
					/>
				</form>
			</div>
		</div>
	);
};

export default DocumentEditor;
