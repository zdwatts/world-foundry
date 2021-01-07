import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";
import "../styles/SignUpForm.css";

const SignUpForm = ({ authenticated, setAuthenticated }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const user = await signUp(username, email, password);
			if (!user.errors) {
				setAuthenticated(true);
			}
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	};

	if (authenticated) {
		return <Redirect to="/" />;
	}

	return (
		<div className="signup-form-wrapper">
			<form onSubmit={onSignUp} className="signup-form">
				<div className="input-wrapper">
					<h1 className="form-title">Writer's Workshop</h1>
					<h3 className="form-subtitle">Sign Up</h3>
					<label>Username</label>
					<input
						className="input"
						type="text"
						name="username"
						onChange={updateUsername}
						value={username}
						required={true}
					/>
				</div>
				<div className="input-wrapper">
					<label>Email</label>
					<input
						className="input"
						required={true}
						type="text"
						name="Email"
						onChange={updateEmail}
						value={email}
					/>
				</div>
				<div className="input-wrapper">
					<label>Password</label>
					<input
						className="input"
						required={true}
						type="password"
						name="password"
						onChange={updatePassword}
						value={password}
					/>
				</div>
				<div className="input-wrapper">
					<label>Confirm Password</label>
					<input
						className="input"
						required={true}
						type="password"
						name="confirm-password"
						onChange={updateConfirmPassword}
						value={confirmPassword}
					/>
				</div>
				<button type="submit" className="signup-button">
					Sign Up
				</button>
				<p className="cta">
					Already registered?{" "}
					<a className="cta-link" href="/login">
						Log In
					</a>
				</p>
			</form>
		</div>
	);
};

export default SignUpForm;
