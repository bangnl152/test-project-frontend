import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Cookies from "js-cookie";

import { loadMovies, shareMovie } from "../actions/movie";
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
const mockToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmcxMSIsImlkIjoiNjExYmZmNDg1M2I1YWIyZjRkZTJkMmE3IiwiaWF0IjoxNjI5Mjk3NzU0fQ.kWPI6fS5VlHOzfckJMdbAf5FFFpDvFSHNzpRr9ZZXdo";

describe("Movies action", () => {
	it("get list success", async () => {
		const store = mockStore({});
		const expectedActions = [
			{ type: MOVIE_LIST_LOADING },
			{ type: MOVIE_LIST_SUCCESS },
		];

		await store.dispatch(loadMovies());
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
		expect(Array.isArray(store.getActions()[1].payload)).toEqual(true);
	});

	it("get list failed", async () => {
		const store = mockStore({});
		const expectedActions = [
			{ type: MOVIE_LIST_LOADING },
			{ type: MOVIE_LIST_ERROR },
		];

		await store.dispatch(loadMovies("hello", "123"));
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
		expect(typeof store.getActions()[1].payload).toBe("string");
	});
});

describe("Movie share action", () => {
	beforeEach(() => {
		Cookies.get = jest.fn().mockImplementation(() => mockToken);
	});
	it("share success", async () => {
		const store = mockStore({});
		const expectedActions = [
			{ type: MOVIE_SHARE_LOADING },
			{ type: MOVIE_SHARE_SUCCESS },
		];

		await store.dispatch(
			shareMovie("https://www.youtube.com/watch?v=Xh0YQp9odv4")
		);
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
	}, 15000);

	it("share failed", async () => {
		const store = mockStore({});
		const expectedActions = [
			{ type: MOVIE_SHARE_LOADING },
			{ type: MOVIE_SHARE_ERROR },
		];

		await store.dispatch(shareMovie("hello", "123"));
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
		expect(typeof store.getActions()[1].payload).toBe("string");
	});
});

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
