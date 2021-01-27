import React from "react";
import { NavLink } from "react-router-dom";

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
					<NavLink exact to="/" activeClassName="active">
						<i class="fas fa-home"></i>
					</NavLink>
					<a href="https://github.com/zdwatts/world-foundry">
						<i class="fab fa-github footer-icon fa-md"></i>
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
