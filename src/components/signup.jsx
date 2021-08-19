import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { signUp, clearSignUp } from "../app-redux/actions/signup";

export default function SignUp() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { loading, error, success } = useSelector((state) => state.signUp);

	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		clearSignUp();
		return () => {
			clearSignUp();
		};
	}, []);

	useEffect(() => {
		if (success) {
			history.push("/login");
		}
	}, [success]);

	useEffect(() => {
		if (error) alert(error);
	}, [error]);

	return (
		<div>
			<h1>Signup</h1>
			{loading ? (
				<p>Loading...</p>
			) : (
				<form>
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={username}
						onChange={(e) => {
							setUserName(e.target.value);
						}}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<button
						type="button"
						onClick={() => {
							dispatch(signUp(username, password));
						}}
					>
						Sign Up
					</button>
				</form>
			)}
		</div>
	);
}
