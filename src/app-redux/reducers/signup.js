import {
	SIGNUP_ERROR,
	SIGNUP_INIT,
	SIGNUP_LOADING,
	SIGNUP_SUCCESS,
} from "../types/signup";

const initState = {
	loading: false,
	error: null,
	success: false,
};

export function signUpReducer(state = initState, action) {
	switch (action.type) {
		case SIGNUP_LOADING:
			return { ...state, loading: true, error: null, success: false };
		case SIGNUP_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false,
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				success: true,
			};
		case SIGNUP_INIT:
			return initState;
		default:
			return state;
	}
}
