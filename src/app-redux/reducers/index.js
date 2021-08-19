import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import { authReducer } from "./auth";

const storageKey = "remitano";
const reducers = combineReducers({
	auth: authReducer,
});

export default persistReducer(
	{
		key: storageKey,
		storage: storageSession,
	},
	reducers
);
