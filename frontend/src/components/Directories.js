import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const Directories = () => {
	const [directories, setDirectories] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/directories/");
			const directoriesList = res.data.directories;
			console.log(directoriesList);
			setDirectories(directoriesList);
		})();
	}, []);

	const useStyles = makeStyles({
		root: {
			height: 110,
			flexGrow: 1,
			maxWidth: 400,
		},
	});

	const classes = useStyles();

	const renderTree = (directories) => (
		<TreeItem
			key={directories.id}
			nodeId={directories.id}
			label={directories.name}
		>
			{Array.isArray(directories.children)
				? directories.children.map((directory) => renderTree(directory))
				: null}
		</TreeItem>
	);

	return (
		<div>
			<h1>Directories</h1>
			<TreeView
				className={classes.root}
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpanded={["root"]}
				defaultExpandIcon={<ChevronRightIcon />}
			>
				{renderTree(directories)}
			</TreeView>
		</div>
	);
};

export default Directories;
