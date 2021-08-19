import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { shareMovie } from "../app-redux/actions/movie";

export default function ShareLink() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { loading, error, success } = useSelector((state) => state.movieShare);

	const [url, setUrl] = useState("");

	useEffect(() => {
		if (success) {
			history.push("/");
		}
	}, [success]);
	useEffect(() => {
		if (error) alert(error);
	}, [error]);

	return (
		<div>
			<h1>Share a link</h1>
			{loading ? (
				<p>Sending...</p>
			) : (
				<form>
					<input
						type="text"
						name="url"
						placeholder="Youtube Url"
						value={url}
						onChange={(e) => {
							setUrl(e.target.value);
						}}
					/>
					<button
						type="button"
						onClick={() => {
							dispatch(shareMovie(url));
						}}
					>
						Share
					</button>
				</form>
			)}
		</div>
	);
}
