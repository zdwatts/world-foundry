import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { authenticate } from "./services/auth";

import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import DocumentEditor from "./components/DocumentEditor";
import Directories from "./components/Directories";

function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			const user = await authenticate();
			if (!user.errors) {
				setAuthenticated(true);
			}
			setLoaded(true);
		})();
	}, []);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar
				setAuthenticated={setAuthenticated}
				authenticated={authenticated}
				authenticate={authenticate}
			/>
			<Switch>
				<Route path="/login" exact={true}>
					<LoginForm
						setAuthenticated={setAuthenticated}
						authenticated={authenticated}
					/>
				</Route>
				<Route path="/signup">
					<SignUpForm
						setAuthenticated={setAuthenticated}
						authenticated={authenticated}
					/>
				</Route>
				<Route exact path="/">
					<LandingPage authenticated={authenticated} />
				</Route>
				<ProtectedRoute exact path="/documents" authenticated={authenticated}>
					<DocumentEditor />
				</ProtectedRoute>
				<ProtectedRoute exact path="/directories" authenticated={authenticated}>
					<Directories />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
