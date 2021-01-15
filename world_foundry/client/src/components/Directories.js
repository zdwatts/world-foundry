import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const Directories = () => {
	const [root, setRoot] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [directories, setDirectories] = useState([]);
	const [parentDirectory, setParentDirectory] = useState("");
	const [directoryName, setDirectoryName] = useState("");
	const [documents, setDocuments] = useState("");
	const history = useHistory();

	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/directories/");
			const rootDirectory = res.data.root;
			setRoot(rootDirectory);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/directories/all");
			const directoriesArray = res.data.directories;
			setDirectories(directoriesArray);
			setParentDirectory(directoriesArray[0].id);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/documents/");
			setDocuments(res.data.documents);
		})();
	}, []);

	const showFormButton = (e) => {
		e.preventDefault();
		if (showForm === false) {
			setShowForm(true);
		} else {
			setShowForm(false);
		}
	};

	const parentDirectoryChange = (e) => {
		setParentDirectory(e.target.value);
	};

	const directoryNameChange = (e) => {
		setDirectoryName(e.target.value);
	};

	const addDirectory = async (e) => {
		e.preventDefault();

		const response = await axios.post("/api/directories/", {
			"parent-directory": parentDirectory,
			"directory-name": directoryName,
		});

		if (response.ok) {
			const data = await response.json();
			const directoryId = data.id;
			history.push(`/directories/${directoryId}`);
		}
	};

	const useStyles = makeStyles({
		root: {
			height: 110,
			flexGrow: 1,
			maxWidth: 400,
		},
	});

	const classes = useStyles();

	const renderTree = (root) => (
		<TreeItem key={root.id} nodeId={root.id} label={root.name}>
			{Array.isArray(root.children)
				? root.children.map((directory) => renderTree(directory))
				: null}
		</TreeItem>
	);

	return (
		<div>
			<div>
				<h1>Directories</h1>
			</div>
			<div>
				<button type="submit" onClick={showFormButton}>
					Create New Directory
				</button>
				{showForm ? (
					<form onSubmit={addDirectory} className="new-directory-form">
						<label>Parent Directory: </label>
						<select
							name="parent-directory"
							onChange={parentDirectoryChange}
							value={parentDirectory}
						>
							{directories.map((directory) => (
								<option value={directory.id}>{directory.name}</option>
							))}
						</select>
						<label>Directory Name</label>
						<input
							type="text"
							name="directory-name"
							onChange={directoryNameChange}
							required
						/>
						<button type="submit">Add Directory</button>
					</form>
				) : null}
			</div>
			<div>
				<TreeView
					className={classes.root}
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpanded={["root"]}
					defaultExpandIcon={<ChevronRightIcon />}
				>
					{renderTree(root)}
				</TreeView>
			</div>
		</div>
	);
};

export default Directories;
