import { HOST } from "../../config/constants";
import request from "./request";

export const share = (url) =>
	request("POST", HOST + "/movies", {
		url,
	});

export const list = (page = 0, limit = 10) =>
	request("GET", HOST + "/movies", {
		page,
		limit,
	});
