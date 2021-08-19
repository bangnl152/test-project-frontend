import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore } from "redux-persist";

import reducers from "./reducers";

export const store = createStore(reducers, applyMiddleware(thunk, logger));
export const persistor = persistStore(store);
