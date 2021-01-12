import React, { useState, useEffect } from "react";
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

	const addDirectory = async (e) => {};

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
						<select name="parent-directory">
							{directories.map((directory) => (
								<option>{directory.name}</option>
							))}
						</select>
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
