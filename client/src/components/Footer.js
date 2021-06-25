import React from "react";
import { NavLink } from "react-router-dom";
import "../components/styles/Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="main-logo">
				<h1
					className="logo-text"
					style={{
						fontFamily: "Permanent Marker, cursive",
					}}
				>
					World Foundry
				</h1>
			</div>
			<ul className="nav-links">
				<li>
					<NavLink exact to="/" activeClassName="active" className="nav-link">
						<i className="fas fa-home"></i> Home
					</NavLink>
					<a
						className="nav-link"
						href="https://github.com/zdwatts/world-foundry"
					>
						<i className="fab fa-github footer-icon fa-md"></i> GitHub
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
