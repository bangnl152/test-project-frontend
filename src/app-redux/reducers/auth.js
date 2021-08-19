import {
	AUTH_ERROR,
	AUTH_LOADING,
	AUTH_LOGOUT,
	AUTH_SUCCESS,
} from "../types/auth";

const initState = {
	user: null,
	loading: false,
	signedIn: false,
	error: null,
};

export function authReducer(state = initState, action) {
	switch (action.type) {
		case AUTH_LOADING:
			return { ...state, loading: true, error: null };
		case AUTH_ERROR:
			return { ...state, loading: false, error: action.payload };
		case AUTH_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				signedIn: true,
				user: action.payload,
			};
		case AUTH_LOGOUT:
			return initState;
		default:
			return state;
	}
}
