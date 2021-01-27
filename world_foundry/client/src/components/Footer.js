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
					<NavLink exact to="/" activeClassName="active">
						<i class="fas fa-home"></i>
					</NavLink>
					<a href="https://github.com/zdwatts/world-foundry">
						<i class="fab fa-github"></i>
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
