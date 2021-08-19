import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import randomstring from "randomstring";

import { signUp } from "../actions/signup";
import { signUpReducer } from "../reducers/signup";
import { SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_LOADING } from "../types/signup";

const middleware = [thunk];
const mockStore = createMockStore(middleware);

const username = randomstring.generate();
const password = randomstring.generate();

describe("Signup action", () => {
	it("signup success", async () => {
		const store = mockStore({});
		const expectedActions = [
			{ type: SIGNUP_LOADING },
			{ type: SIGNUP_SUCCESS },
		];

		await store.dispatch(signUp(username, password));
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
	});

	it("signup failed", async () => {
		const store = mockStore({});
		const expectedActions = [{ type: SIGNUP_LOADING }, { type: SIGNUP_ERROR }];

		await store.dispatch(signUp(username, password));
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
		expect(typeof store.getActions()[1].payload).toBe("string");
	});
});

describe("Signup reducer", () => {
	const initState = {
		loading: false,
		error: null,
		success: false,
	};

	it("initial state", () => {
		const updatedState = signUpReducer(undefined, {});
		expect(updatedState).toEqual(initState);
	});

	it("sigup success", () => {
		const updatedState = signUpReducer(initState, {
			type: SIGNUP_SUCCESS,
		});
		expect(updatedState).toEqual({
			...initState,
			loading: false,
			success: true,
			error: null,
		});
	});
	it("signup failed", () => {
		const updatedState = signUpReducer(initState, {
			type: SIGNUP_ERROR,
			payload: "Error",
		});
		expect(updatedState).toEqual({
			...initState,
			success: false,
			error: "Error",
			loading: false,
		});
	});

	it("loading", () => {
		const updatedState = signUpReducer(initState, { type: SIGNUP_LOADING });
		expect(updatedState).toEqual({
			...initState,
			loading: true,
		});
	});
});
