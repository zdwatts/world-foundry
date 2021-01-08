import React, { useState, useEffect } from "react";
import axios from "axios";

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

	return (
		<div>
			<h1>Directories</h1>
			<div>
				<ul>
					{directories.map((directory) => {
						return <li key={directory.id}>{directory.name}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};

export default Directories;
