import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import DemoButton from "./auth/DemoButton";

const NavBar = ({ setAuthenticated, authenticated, authenticate }) => {
	const [userId, setUserId] = useState("");

	useEffect(() => {
		(async () => {
			const response = await authenticate();
			const id = response.id;
			setUserId(id);
		})();
	}, [authenticate]);

	return (
		<nav>
			<div>
				<ul>
					<li>
						<NavLink exact to="/">
							Home
						</NavLink>
					</li>
					<li>
						<DemoButton
							setAuthenticated={setAuthenticated}
							authenticated={authenticated}
						/>
					</li>
					<li>
						<LogoutButton
							setAuthenticated={setAuthenticated}
							authenticated={authenticated}
						/>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
