import React, { useState, useEffect } from "react";
import { authenticate } from "../services/auth";
import "./styles/LandingPage.css";

const LandingPage = ({ authenticated }) => {
	const [currentUser, setCurrentUser] = useState("");

	useEffect(() => {
		(async () => {
			const response = await authenticate();
			const user = response.username;
			setCurrentUser(user);
		})();
	});

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
			<h1 className="greeting">Greetings, {greeting()}.</h1>
		</>
	);
};

export default LandingPage;
