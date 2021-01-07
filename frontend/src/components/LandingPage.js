import React, { useState, useEffect } from "react";
import { authenticate } from "../services/auth";

const LandingPage = ({ setAuthenticated, authenticated }) => {
	const [currentUser, setCurrentUser] = useState("");

	useEffect(() => {
		(async () => {
			const response = await authenticate();
			const user = response.username;
			console.log(user);
			setCurrentUser(user);
		})();
	});

	console.log(currentUser);

	const greeting = () => {
		let greeting;
		if (authenticated) {
			greeting = currentUser;
		} else {
			greeting = "Guest";
		}
		return greeting;
	};

	return (
		<>
			<h1>Greetings, {greeting()}.</h1>
		</>
	);
};

export default LandingPage;
