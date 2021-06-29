import React, { useState, useEffect } from "react";
import { authenticate } from "../services/auth";
import Directories from "./Directories";
import DocumentEditor from "./DocumentEditor"
import "./styles/LandingPage.css";
import writer from "./images/writer.png";
import DocumentsProvider from "../context/DocumentsContext"

const LandingPage = ({ authenticated }) => {
	const [currentUser, setCurrentUser] = useState("");


	useEffect(() => {
		(async () => {
			const response = await authenticate();
			const user = response.username;
			setCurrentUser(user);
		})();
	});


	const greeting = () => {
		let greeting;
		if (authenticated) {
			greeting = currentUser;
		} else {
			greeting = "friend";
		}
		return greeting;
	};

	return (
		<>
			{authenticated ? (
				<div className="home-wrapper">
					<DocumentsProvider>
						<DocumentEditor authenticate={authenticate} />
						<Directories />
					</DocumentsProvider>
				</div>
			) : (
				<div className="landing-wrapper">
					<div className="greeting-wrapper">
						<h1 className="greeting"> Greetings, {greeting()}.</h1>
						<p className="greeting-body">
							Welcome to World Foundry. This is a place for writers who wish to
							take their worlds to the next level. Here you will cultivate real,
							living people, things and places from nothing more than the
							written word. World Foundry will help you turn your entirely
							imagined creations into something indistinguishable from reality
							for both yourself and your readers. Feel free to try the demo
							login to get a feel for how the app works, or create an account
							and get started.
						</p>
					</div>
					<img className="splash-image" src={writer} alt=""></img>
				</div>
			)}
		</>
	);
};

export default LandingPage;
