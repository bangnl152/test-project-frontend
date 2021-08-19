import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../app-redux/actions/auth";

export default function Login() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { loading, error, signedIn } = useSelector((state) => state.auth);

	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (error) alert(error);
	}, [error]);

	return (
		<div>
			<h1>Login</h1>
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
							dispatch(login(username, password));
						}}
					>
						Sign Up
					</button>
				</form>
			)}
		</div>
	);
}
