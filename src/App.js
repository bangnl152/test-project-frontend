import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./app-redux";
import { history, AppRouter } from "./routers";
import "./App.css";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router history={history}>
					<AppRouter />
				</Router>
			</PersistGate>
		</Provider>
	);
}

export default App;
