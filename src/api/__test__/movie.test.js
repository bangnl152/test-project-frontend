import Cookies from "js-cookie";
import * as MovieApi from "../_api/movie";

const mockToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmcxMSIsImlkIjoiNjExYmZmNDg1M2I1YWIyZjRkZTJkMmE3IiwiaWF0IjoxNjI5Mjk3NzU0fQ.kWPI6fS5VlHOzfckJMdbAf5FFFpDvFSHNzpRr9ZZXdo";

const testUrls = [
	["https://www.youtube.com/watch?v=Xh0YQp9odv4", 200],
	["https://www.youtube.com/watch?v=JPJjwHAIny4", 200],
	["https://youtu.be/d44UTUSTYKU", 200],
	["http://www.youtube.com/watch?v=Xh0YQp9odv4", 200],
	["http://www.youtube.com/watch?v=JPJjwHAIny4", 200],
	["http://youtu.be/d44UTUSTYKU", 200],
	["https://www.youtube.com/watch?v=Zzn9-ATB9a", 404],
	["https://remitano.com/btc/vn/careers", 401],
	[100000, 400],
	[true, 400],
];

// page, limit
const testQueries = [
	[[0, 0], 200],
	[[1, 1], 200],
	[[-10, 0], 200],
	[[-10, -10], 200],
	[[1, 20], 200],
	[["hello", "good"], 401],
	[[true, 10], 401],
];

describe("POST /movies - Share link", () => {
	beforeEach(() => {
		Cookies.get = jest.fn().mockImplementation(() => mockToken);
	});
	for (const [url, status] of testUrls) {
		it(`Share ${url}`, async () => {
			try {
				const result = await MovieApi.share(url);
				expect(result).toHaveProperty("title");
				expect(result).toHaveProperty("description");
				expect(result).toHaveProperty("share_by");
			} catch (err) {
				expect(err.status).toEqual(status);
			}
		}, 15000);
	}
});

describe("GET /movies - Get movies", () => {
	for (const [[page, limit], status] of testQueries) {
		it(`Get page ${page} limit ${limit}`, async () => {
			try {
				const result = await MovieApi.list(page, limit);
				expect(Array.isArray(result)).toBe(true);
			} catch (err) {
				expect(err.status).toEqual(status);
			}
		});
	}
});
