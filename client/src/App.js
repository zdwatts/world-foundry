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
import Document from "./components/Document";
import Footer from "./components/Footer";

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
					<DocumentEditor authenticate={authenticate} />
				</ProtectedRoute>
				<ProtectedRoute path="/documents/:id" authenticated={authenticated}>
					<Document authenticate={authenticate} />
				</ProtectedRoute>
				<ProtectedRoute exact path="/directories" authenticated={authenticated}>
					<Directories />
				</ProtectedRoute>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
