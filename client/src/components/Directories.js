import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDocuments } from "../context/DocumentsContext"
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./styles/Directories.css";

const Directories = () => {
	const [root, setRoot] = useState({});
	const [showForm, setShowForm] = useState(false);
	const [directories, setDirectories] = useState([]);
	const [parentDirectory, setParentDirectory] = useState("");
	const [directoryName, setDirectoryName] = useState("");

	const history = useHistory();

	const documents = useDocuments()

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

	const parentDirectoryChange = (e) => {
		setParentDirectory(e.target.value);
	};

	const directoryNameChange = (e) => {
		setDirectoryName(e.target.value);
	};

	const addDirectory = async (e) => {
		e.preventDefault();

		await axios.post("/api/directories/", {
			"parent-directory": parentDirectory,
			"directory-name": directoryName,
		});

		const res = await axios.get("/api/directories/");
		const newRoot = res.data.root;
		setRoot(newRoot)

	};

	const useStyles = makeStyles({
		root: {
			height: 110,
			flexGrow: 1,
			maxWidth: 400,
		},
	});

	const classes = useStyles();

	// <TreeItem
	// 		key={document.id}
	// 		nodeId={document.id}
	// 		label={document.name}
	// 	/>

	const renderTree = (root) => (
		<TreeItem key={root.id} nodeId={root.name} label={root.name}>
			{Array.isArray(root.children)
				? root.children.map((directory) => renderTree(directory))
				: null}
			{documents
				.filter((document) => document.directory_id === root.id)
				.map((document) => (
					<TreeItem
						key={document.id}
						nodeId={`${root.id}-${document.id}`}
						label={document.title}
						onClick={() => history.push(`documents/${document.id}`)}
					/>
				))}
		</TreeItem>
		);

	console.log(root)

	return (
		<div className="page-wrapper">
			<div className="header-wrapper">
				<h1 className="directories-header">Directories</h1>
			</div>
			<div>
				<button
					type="submit"
					className="buttons"
					onClick={() => setShowForm(!showForm)}
				>
					Add New Directory
				</button>
				{showForm ? (
					<form onSubmit={addDirectory} className="new-directory-form">
						<div className="inputs-wrapper">
							<label>Parent Directory</label>
							<select
								name="parent-directory"
								onChange={parentDirectoryChange}
								value={parentDirectory}
								required
							>
								{directories.map((directory) => (
									<option key={directory.id} value={directory.id}>{directory.name}</option>
								))}
							</select>

							<label>Directory Name</label>
							<input
								type="text"
								name="directory-name"
								onChange={directoryNameChange}
								required
							/>
						</div>
						<button type="submit" className="buttons">
							Add Directory
						</button>
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
