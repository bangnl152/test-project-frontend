import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { loadMovies } from "../app-redux/actions/movie";

import "./home.css";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function Home() {
	const dispatch = useDispatch();
	const { loading, error, list } = useSelector((state) => state.movieList);
	const { signedIn } = useSelector((state) => state.auth);

	const query = useQuery();
	let page = parseInt(query.get("page") || 0);
	let limit = parseInt(query.get("limit") || 10);

	if (isNaN(page)) page = 0;
	if (isNaN(limit)) limit = 10;

	useEffect(() => {
		dispatch(loadMovies(page, limit));
	}, []);

	useEffect(() => {
		if (error) alert(error);
	}, [error]);

	return (
		<div>
			<h1>Movie List</h1>
			{signedIn ? (
				<div>
					<a href="/share">Share</a> | <a href="/logout">Logout</a>
				</div>
			) : (
				<div>
					<a href="/login">Login</a>|<a href="/signup">Sign Up</a>
				</div>
			)}
			{list == null || loading ? (
				<p>Loading...</p>
			) : (
				<div className="movie-list">
					{list.map((movie) => (
						<div className="movie-list-item">
							<div className="movie-list-image">
								<img src={movie.image} width="200" />
							</div>
							<div className="movie-list-content">
								<h4>
									<a href={movie.url} target="_blank">
										{movie.title}
									</a>
								</h4>
								<p>{movie.description}</p>
								<p>Share by: {movie.share_by}</p>
							</div>
						</div>
					))}
					<div className="movie-list-paging">
						{page == 0 ? null : <a href={`?page=${page - 1}`}>Prev</a>} |{" "}
						<a href={`?page=${page + 1}`}>Next</a>
					</div>
				</div>
			)}
		</div>
	);
}
