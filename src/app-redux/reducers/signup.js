import { SIGNUP_ERROR, SIGNUP_LOADING, SIGNUP_SUCCESS } from "../types/signup";

const initState = {
	loading: false,
	error: null,
	success: false,
};

export function signUpReducer(state = initState, action) {
	switch (action.type) {
		case SIGNUP_LOADING:
			return { ...state, loading: true, error: null };
		case SIGNUP_ERROR:
			return { ...state, loading: false, error: action.payload };
		case SIGNUP_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				success: true,
			};
		default:
			return state;
	}
}
