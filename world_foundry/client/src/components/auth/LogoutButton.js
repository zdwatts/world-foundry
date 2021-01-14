import React from "react";
import { logout } from "../../services/auth";
import { useHistory } from "react-router-dom";
import "../styles/NavBar.css";

const LogoutButton = ({ setAuthenticated, authenticated }) => {
	const history = useHistory();

	const onLogout = async (e) => {
		await logout();
		setAuthenticated(false);
		history.push("/");
		window.location.reload(false);
	};

	return authenticated ? (
		<button className="buttons" onClick={onLogout}>
			{authenticated ? "Logout" : "Login"}
		</button>
	) : (
		""
	);
};

export default LogoutButton;
