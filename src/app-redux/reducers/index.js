import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import { authReducer } from "./auth";
import { signUpReducer } from "./signup";

const storageKey = "remitano";
const reducers = combineReducers({
	auth: authReducer,
	signUp: signUpReducer,
});

export default persistReducer(
	{
		key: storageKey,
		storage: storageSession,
	},
	reducers
);
