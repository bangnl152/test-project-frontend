import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login, logout } from "../actions/auth";
import { authReducer } from "../reducers/auth";
import {
	AUTH_LOADING,
	AUTH_ERROR,
	AUTH_SUCCESS,
	AUTH_LOGOUT,
} from "../types/auth";

const middleware = [thunk];
const mockStore = createMockStore(middleware);

describe("Auth action", () => {
	it("login success", async () => {
		const store = mockStore({ auth: {} });
		const username = "bang11";
		const password = "abc123456";
		const expectedActions = [{ type: AUTH_LOADING }, { type: AUTH_SUCCESS }];

		await store.dispatch(login(username, password));
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
		expect(typeof store.getActions()[1].payload).toBe("object");
		expect(store.getActions()[1].payload).toHaveProperty("username");
	});

	it("login failed", async () => {
		const store = mockStore({ auth: {} });
		const username = "bang11";
		const password = "abc";
		const expectedActions = [{ type: AUTH_LOADING }, { type: AUTH_ERROR }];

		await store.dispatch(login(username, password));
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
		expect(typeof store.getActions()[1].payload).toBe("string");
	});

	it("logout", async () => {
		const store = mockStore({
			auth: {
				user: { username: "bang11" },
				loading: false,
				error: null,
				signedIn: true,
			},
		});
		const expectedActions = [{ type: AUTH_LOGOUT }];

		await store.dispatch(logout()).then();
		expect(store.getActions().map((a) => a.type)).toEqual(
			expectedActions.map((a) => a.type)
		);
	});
});

describe("Auth reducer", () => {
	const initState = {
		user: null,
		loading: false,
		signedIn: false,
		error: null,
	};

	it("initial state", () => {
		const updatedState = authReducer(undefined, {});
		expect(updatedState).toEqual(initState);
	});

	it("login success", () => {
		const updatedState = authReducer(initState, {
			type: AUTH_SUCCESS,
			payload: { username: "bang11" },
		});
		expect(updatedState).toEqual({
			...initState,
			user: { username: "bang11" },
			signedIn: true,
		});
	});
	it("login failed", () => {
		const updatedState = authReducer(initState, {
			type: AUTH_ERROR,
			payload: "Error",
		});
		expect(updatedState).toEqual({
			...initState,
			user: null,
			error: "Error",
			loading: false,
		});
	});

	it("logout", () => {
		const updatedState = authReducer(initState, { type: AUTH_LOGOUT });
		expect(updatedState).toEqual(initState);
	});
});
