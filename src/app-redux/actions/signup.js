import { AuthApi } from "../../api";
import { SIGNUP_ERROR, SIGNUP_LOADING, SIGNUP_SUCCESS } from "../types/signup";

function signUpProcessing() {
	return { type: SIGNUP_LOADING };
}

function signUpError(message) {
	return { type: SIGNUP_ERROR, payload: message };
}

function signUpSuccess() {
	return { type: SIGNUP_SUCCESS };
}

export function signUp(username, password) {
	return async (dispatch, getStore) => {
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
