import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";

import { KEY_ACCESS_TOKEN } from "../../config/constants";

export default async function request(method, url, data) {
	const headers = {};

	const token = Cookies.get(KEY_ACCESS_TOKEN);
	if (token != undefined) {
		headers["Authorization"] = "Bearer " + token;
	}

	const config = {
		method,
		headers,
		url,
		paramsSerializer: (params) => qs.stringify(params, { indices: false }),
	};

	if (method === "GET" || method === "get") config.params = data;
	else config.data = data;

	try {
		const response = await axios.request(config);
		if (response && response.status === 200) return response.data;
	} catch (err) {
		if (err.response && err.response.status) {
			throw { message: err.response.data, status: err.response.status };
		}
		throw err;
	}
}
