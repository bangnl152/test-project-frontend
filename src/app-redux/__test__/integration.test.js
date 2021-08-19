import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import randomstring from "randomstring";
import Cookies from "js-cookie";

import { login, logout } from "../actions/auth";
import { signUp } from "../actions/signup";
import { shareMovie } from "../actions/movie";
import {
	AUTH_LOADING,
	AUTH_ERROR,
	AUTH_SUCCESS,
	AUTH_LOGOUT,
} from "../types/auth";
import { SIGNUP_LOADING, SIGNUP_SUCCESS } from "../types/signup";
import {
	MOVIE_SHARE_ERROR,
	MOVIE_SHARE_LOADING,
	MOVIE_SHARE_SUCCESS,
} from "../types/movie";
import { KEY_ACCESS_TOKEN } from "../../config/constants";

const middleware = [thunk];
const mockStore = createMockStore(middleware);

describe("SignUp, Login and Share", () => {
	let store = mockStore({});
	let username = randomstring.generate();
	let password = randomstring.generate();

	beforeEach(() => {
		store = mockStore({});
		username = randomstring.generate();
		password = randomstring.generate();
		Cookies.remove(KEY_ACCESS_TOKEN);
	});

	it("success", async () => {
		const expectedActions = [
			{ type: SIGNUP_LOADING },
			{ type: SIGNUP_SUCCESS },
			{ type: AUTH_LOADING },
			{ type: AUTH_SUCCESS },
			{ type: MOVIE_SHARE_LOADING },
			{ type: MOVIE_SHARE_SUCCESS },
		];
		await store.dispatch(signUp(username, password));
		await store.dispatch(login(username, password));
		await store.dispatch(
			shareMovie("https://www.youtube.com/watch?v=Xh0YQp9odv4")
		);
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
	}, 15000);

	it("auth failed", async () => {
		const expectedActions = [
			{ type: SIGNUP_LOADING },
			{ type: SIGNUP_SUCCESS },
			{ type: AUTH_LOADING },
			{ type: AUTH_ERROR },
			{ type: MOVIE_SHARE_LOADING },
			{ type: MOVIE_SHARE_ERROR },
		];
		await store.dispatch(signUp(username, password));
		await store.dispatch(login(username, password + "123"));
		await store.dispatch(
			shareMovie("https://www.youtube.com/watch?v=Xh0YQp9odv4")
		);
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
	}, 15000);

	it("logout before share", async () => {
		const expectedActions = [
			{ type: SIGNUP_LOADING },
			{ type: SIGNUP_SUCCESS },
			{ type: AUTH_LOADING },
			{ type: AUTH_SUCCESS },
			{ type: AUTH_LOGOUT },
			{ type: MOVIE_SHARE_LOADING },
			{ type: MOVIE_SHARE_ERROR },
		];
		await store.dispatch(signUp(username, password));
		await store.dispatch(login(username, password));
		await store.dispatch(logout());
		await store.dispatch(
			shareMovie("https://www.youtube.com/watch?v=Xh0YQp9odv4")
		);
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
	}, 15000);
});
