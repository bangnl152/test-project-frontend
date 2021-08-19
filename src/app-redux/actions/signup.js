import { AuthApi } from "../../api";
import {
	SIGNUP_ERROR,
	SIGNUP_LOADING,
	SIGNUP_SUCCESS,
	SIGNUP_INIT,
} from "../types/signup";

function signUpProcessing() {
	return { type: SIGNUP_LOADING };
}

function signUpError(message) {
	return { type: SIGNUP_ERROR, payload: message };
}

function signUpSuccess() {
	return { type: SIGNUP_SUCCESS };
}

export function clearSignUp() {
	return { type: SIGNUP_INIT };
}

export function signUp(username, password) {
	return async (dispatch, getStore) => {
		if (!(username && password)) {
			dispatch(signUpError("Please enter username and password"));
			return;
		}
		if (username.length <= 6) {
			dispatch(signUpError("Username must be longer than 6 characters"));
			return;
		}
		if (password.length <= 6) {
			dispatch(signUpError("Password must be longer than 6 characters"));
			return;
		}
		dispatch(signUpProcessing());
		try {
			const { success } = await AuthApi.signUp(username, password);
			if (success) {
				dispatch(signUpSuccess());
			} else {
				dispatch(signUpError("Unknow error"));
			}
		} catch (err) {
			dispatch(signUpError(err.message));
		}
	};
}
