import {
	MOVIE_LIST_ERROR,
	MOVIE_LIST_LOADING,
	MOVIE_LIST_SUCCESS,
	MOVIE_SHARE_ERROR,
	MOVIE_SHARE_LOADING,
	MOVIE_SHARE_SUCCESS,
} from "../types/movie";

const initListState = {
	loading: false,
	error: null,
	list: null,
};

export function movieListReducer(state = initListState, action) {
	switch (action.type) {
		case MOVIE_LIST_LOADING:
			return { ...state, loading: true, error: null };
		case MOVIE_LIST_ERROR:
			return { ...state, loading: false, error: action.payload };
		case MOVIE_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				list: action.payload,
			};
		default:
			return state;
	}
}

const initShareState = {
	loading: false,
	error: null,
	success: false,
};

export function movieShareReducer(state = initShareState, action) {
	switch (action.type) {
		case MOVIE_SHARE_LOADING:
			return { ...state, loading: true, error: null, success: false };
		case MOVIE_SHARE_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false,
			};
		case MOVIE_SHARE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		default:
			return state;
	}
}
