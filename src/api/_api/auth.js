import { HOST } from "../../config/constants";
import request from "./request";

export const login = (username, password) =>
	request("POST", HOST + "/login", {
		username,
		password,
	});

export const signUp = (username, password) =>
	request("POST", HOST + "/users", {
		username,
		password,
	});
