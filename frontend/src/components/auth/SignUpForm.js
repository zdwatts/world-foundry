import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";

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
		<div>
			<form onSubmit={onSignUp}>
				<div>
					<label>Username</label>
					<input
						type="text"
						name="username"
						onChange={updateUsername}
						value={username}
					/>
				</div>
				<div>
					<label>Email</label>
					<input
						type="text"
						name="Email"
						onChange={updateEmail}
						value={email}
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type="password"
						name="password"
						onChange={updatePassword}
						value={password}
					/>
				</div>
				<div>
					<label>Confirm Password</label>
					<input
						type="password"
						name="confirm-password"
						onChange={updateConfirmPassword}
						value={confirmPassword}
					/>
				</div>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUpForm;
