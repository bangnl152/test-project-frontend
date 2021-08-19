import randomstring from "randomstring";
import * as AuthApi from "../_api/auth";

const username = randomstring.generate();
const password = randomstring.generate();

const createUserData = [
	["happy case", username, password, 200],
	["username existed", username, password, 401],
	["without password", username, null, 400],
	["without username", null, password, 400],
	["without username and password", null, null, 400],
	["empty username and password", "", "", 400],
	["username too short", "a", password, 400],
	["password too short", username, "a", 400],
	["username and password too short", "a", "b", 400],
	["username incorrect type", 123, password, 400],
	["password incorrect type", username, true, 400],
	["username and password incorrect type", 123, false, 400],
];

const loginUserData = [
	["happy case", username, password, 200],
	["wrong password", username, "abc", 403],
	["without password", username, null, 400],
	["without username", null, password, 400],
	["without username and password", null, null, 400],
	["empty username and password", "", "", 400],
	["username incorrect type", 123, password, 400],
	["password incorrect type", username, true, 400],
	["username and password incorrect type", 123, false, 400],
];

describe("POST /users - Sign Up", () => {
	for (const [title, username, password, status] of createUserData) {
		it(title, async () => {
			try {
				const result = await AuthApi.signUp(username, password);
				expect(result).toHaveProperty("success");
			} catch (err) {
				expect(err.status).toEqual(status);
			}
		});
	}
});
describe("POST /login - Login User", function () {
	for (const [title, username, password, status] of loginUserData) {
		it(title, async () => {
			try {
				const result = await AuthApi.login(username, password);
				expect(result).toHaveProperty("token");
			} catch (err) {
				expect(err.status).toEqual(status);
			}
		});
	}
});
