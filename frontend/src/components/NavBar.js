import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import DemoButton from "./auth/DemoButton";
import "./styles/NavBar.css";

const NavBar = ({ setAuthenticated, authenticated, authenticate }) => {
	return (
		<nav className="navbar">
			<div className="main-logo">
				<a href="/" style={{ textDecoration: "none" }}>
					<h1
						className="logo-text"
						style={{
							fontFamily: "Permanent Marker, cursive",
						}}
					>
						Writer's Workshop
					</h1>
				</a>
			</div>
			<div className="links-wrapper">
				<ul className="nav-links">
					<li>
						<NavLink exact to="/">
							Home
						</NavLink>
					</li>
					{authenticated ? (
						""
					) : (
						<li>
							<NavLink to="/login" activeClassName="active">
								Log In
							</NavLink>
						</li>
					)}
					{authenticated ? (
						""
					) : (
						<li>
							<NavLink to="/signup" activeClassName="active">
								Sign Up
							</NavLink>
						</li>
					)}
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
