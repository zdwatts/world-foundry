import React from "react";
import { demo } from "../../services/auth";

const DemoButton = ({ setAuthenticated, authenticated }) => {
	const demoLogin = async (e) => {
		await demo();
		setAuthenticated(true);
		window.location.reload(false);
	};

	return authenticated ? "" : <button onClick={demoLogin}>Demo Login</button>;
};

export default DemoButton;
