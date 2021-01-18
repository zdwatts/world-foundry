import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import "../styles/LoginForm.css";

const LoginForm = ({ authenticated, setAuthenticated }) => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = async (e) => {
		e.preventDefault();
		const user = await login(email, password);
		if (!user.errors) {
			setAuthenticated(true);
		} else {
			setErrors(user.errors);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (authenticated) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login-form-wrapper">
			<form onSubmit={onLogin} className="login-form">
				<div className="errors-wrapper">
					{errors.map((error) => (
						<div className="errors">
							<p className="error">{error}</p>
						</div>
					))}
				</div>
				<div className="input-wrapper">
					<h1 className="form-title">World Foundry</h1>
					<h3 className="form-subtitle">Log In</h3>
					<label>Email</label>
					<input
						className="input"
						name="email"
						type="text"
						value={email}
						onChange={updateEmail}
					/>
				</div>
				<div className="input-wrapper">
					<label>Password</label>
					<input
						className="input"
						name="password"
						type="password"
						value={password}
						onChange={updatePassword}
					/>
				</div>
				<button type="submit" className="login-button">
					Login
				</button>
				<p className="cta">
					Not a member?{" "}
					<a className="cta-link" href="/signup">
						Register here
					</a>
				</p>
			</form>
		</div>
	);
};

export default LoginForm;
