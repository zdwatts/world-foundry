import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
	return (
		<footer>
			<div>
				<h1>World Foundry</h1>
			</div>
			<ul>
				<li>
					<NavLink exact to="/" activeClassName="active" />
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
