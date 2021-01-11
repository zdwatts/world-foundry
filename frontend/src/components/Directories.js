import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const Directories = () => {
	const [root, setRoot] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/directories/");
			console.log(res.data.root);
			const rootDirectory = res.data.root;
			setRoot(rootDirectory);
		})();
	}, []);

	console.log(root);

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
			<h1>Directories</h1>
			<TreeView
				className={classes.root}
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpanded={["root"]}
				defaultExpandIcon={<ChevronRightIcon />}
			>
				{renderTree(root)}
			</TreeView>
		</div>
	);
};

export default Directories;
