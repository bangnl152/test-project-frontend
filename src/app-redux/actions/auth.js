import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Cookies from "js-cookie";
import { AuthApi } from "../../api";
import {
	AUTH_ERROR,
	AUTH_LOADING,
	AUTH_LOGOUT,
	AUTH_SUCCESS,
} from "../types/auth";
import { KEY_ACCESS_TOKEN } from "../../config/constants";

function signInProcessing() {
	return { type: AUTH_LOADING };
}

function signInError(message) {
	return { type: AUTH_ERROR, payload: message };
}

function signInSuccess(user) {
	return { type: AUTH_SUCCESS, payload: user };
}

function signOut() {
	return { type: AUTH_LOGOUT };
}

export function login(username, password) {
	return async (dispatch, getStore) => {
		dispatch(signInProcessing());
		try {
			const { token } = await AuthApi.login(username, password);
			if (token) {
				Cookies.set(KEY_ACCESS_TOKEN, token);
				const user = { username };
				dispatch(signInSuccess(user));
			} else {
				dispatch(signInError("No token found"));
			}
		} catch (err) {
			dispatch(signInError(err.message));
		}
	};
}

export function logout() {
	return async (dispatch, getStore) => {
		Cookies.remove(KEY_ACCESS_TOKEN);
		dispatch(signOut());
	};
}
