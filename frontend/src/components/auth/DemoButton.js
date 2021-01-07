import React from "react";
import { demo } from "../../services/auth";
import "../styles/NavBar.css";

const DemoButton = ({ setAuthenticated, authenticated }) => {
	const demoLogin = async (e) => {
		await demo();
		setAuthenticated(true);
		window.location.reload(false);
	};

	return authenticated ? (
		""
	) : (
		<button className="buttons" onClick={demoLogin}>
			Demo Login
		</button>
	);
};

export default DemoButton;
