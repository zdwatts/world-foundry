import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import DemoButton from "./auth/DemoButton";

const NavBar = ({ setAuthenticated, authenticated, authenticate }) => {
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
						<NavLink to="/login">Log In</NavLink>
					</li>
					<li>
						<NavLink to="/signup">Sign Up</NavLink>
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
