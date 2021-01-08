import React, { useState, useEffect } from "react";

const Directories = () => {
	const [directories, setDirectories] = useState([]);

	useEffect(() => {
		(async () => {
			const data = await fetch("/api/directories/");
			console.log(data);
		})();
	});

	return <h1>Directories</h1>;
};

export default Directories;
