import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { signUp } from "../actions/signup";
import { movieListReducer, movieShareReducer } from "../reducers/movie";
import {
	MOVIE_LIST_ERROR,
	MOVIE_LIST_LOADING,
	MOVIE_LIST_SUCCESS,
	MOVIE_SHARE_ERROR,
	MOVIE_SHARE_LOADING,
	MOVIE_SHARE_SUCCESS,
} from "../types/movie";

const middleware = [thunk];
const mockStore = createMockStore(middleware);

// describe("Movie action", () => {
// 	it("get list success", async () => {
// 		const store = mockStore({ auth: {} });
// 		const expectedActions = [
// 			{ type: SIGNUP_LOADING },
// 			{ type: SIGNUP_SUCCESS },
// 		];

// 		await store.dispatch(signUp(username, password));
// 		expect(store.getActions().map((a) => a.type)).toEqual(
// 			expectedActions.map((a) => a.type)
// 		);
// 	});

// 	it("get list failed", async () => {
// 		const store = mockStore({ auth: {} });
// 		const expectedActions = [{ type: SIGNUP_LOADING }, { type: SIGNUP_ERROR }];

// 		await store.dispatch(signUp(username, password));
// 		expect(store.getActions().map((a) => a.type)).toEqual(
// 			expectedActions.map((a) => a.type)
// 		);
// 		expect(typeof store.getActions()[1].payload).toBe("string");
// 	});
// });

describe("Movie list reducer", () => {
	const initListState = {
		loading: false,
		error: null,
		list: null,
	};

	it("initial state", () => {
		const updatedState = movieListReducer(undefined, {});
		expect(updatedState).toEqual(initListState);
	});

	it("movie list success", () => {
		const payload = [{ title: "abc" }];
		const updatedState = movieListReducer(initListState, {
			type: MOVIE_LIST_SUCCESS,
			payload,
		});
		expect(updatedState).toEqual({
			...initListState,
			loading: false,
			error: null,
			list: payload,
		});
	});
	it("movie list failed", () => {
		const updatedState = movieListReducer(initListState, {
			type: MOVIE_LIST_ERROR,
			payload: "Error",
		});
		expect(updatedState).toEqual({
			...initListState,
			error: "Error",
			loading: false,
		});
	});

	it("loading", () => {
		const updatedState = movieListReducer(initListState, {
			type: MOVIE_LIST_LOADING,
		});
		expect(updatedState).toEqual({
			...initListState,
			loading: true,
		});
	});
});

describe("Movie share reducer", () => {
	const initShareState = {
		loading: false,
		error: null,
		success: false,
	};

	it("initial state", () => {
		const updatedState = movieShareReducer(undefined, {});
		expect(updatedState).toEqual(initShareState);
	});

	it("movie share success", () => {
		const updatedState = movieShareReducer(initShareState, {
			type: MOVIE_SHARE_SUCCESS,
		});
		expect(updatedState).toEqual({
			...initShareState,
			loading: false,
			error: null,
			success: true,
		});
	});
	it("movie share failed", () => {
		const updatedState = movieShareReducer(initShareState, {
			type: MOVIE_SHARE_ERROR,
			payload: "Error",
		});
		expect(updatedState).toEqual({
			...initShareState,
			error: "Error",
			loading: false,
			success: false,
		});
	});

	it("loading", () => {
		const updatedState = movieShareReducer(initShareState, {
			type: MOVIE_SHARE_LOADING,
		});
		expect(updatedState).toEqual({
			...initShareState,
			loading: true,
			success: false,
		});
	});
});
