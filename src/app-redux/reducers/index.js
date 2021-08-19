import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import { authReducer } from "./auth";
import { signUpReducer } from "./signup";
import { movieListReducer, movieShareReducer } from "./movie";

const storageKey = "remitano";
const reducers = combineReducers({
	auth: authReducer,
	signUp: signUpReducer,
	movieList: movieListReducer,
	movieShare: movieShareReducer,
});

export default persistReducer(
	{
		key: storageKey,
		storage: storageSession,
		whitelist: ["auth"],
	},
	reducers
);
