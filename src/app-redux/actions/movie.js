import { MovieApi } from "../../api";
import {
	MOVIE_LIST_ERROR,
	MOVIE_LIST_LOADING,
	MOVIE_LIST_SUCCESS,
	MOVIE_SHARE_ERROR,
	MOVIE_SHARE_LOADING,
	MOVIE_SHARE_SUCCESS,
} from "../types/movie";

function movieListProcessing() {
	return { type: MOVIE_LIST_LOADING };
}

function movieListError(message) {
	return { type: MOVIE_LIST_ERROR, payload: message };
}

function movieListSuccess(payload) {
	return { type: MOVIE_LIST_SUCCESS, payload };
}

export function loadMovies(page = 0, limit = 10) {
	return async (dispatch, getStore) => {
		dispatch(movieListProcessing());
		try {
			const list = await MovieApi.list(page, limit);
			dispatch(movieListSuccess(list));
		} catch (err) {
			dispatch(movieListError(err.message));
		}
	};
}

function movieShareProcessing() {
	return { type: MOVIE_SHARE_LOADING };
}

function movieShareError(message) {
	return { type: MOVIE_SHARE_ERROR, payload: message };
}

function movieShareSuccess() {
	return { type: MOVIE_SHARE_SUCCESS };
}

export function shareMovie(url) {
	return async (dispatch, getStore) => {
		dispatch(movieShareProcessing());
		try {
			const _ = await MovieApi.share(url);
			dispatch(movieShareSuccess());
		} catch (err) {
			dispatch(movieShareError(err.message));
		}
	};
}
