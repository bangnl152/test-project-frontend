import { Switch } from "react-router-dom";
import Route from "./route";

import Home from "../components/home";
import Logout from "../components/logout";
import Login from "../components/login";
import SignUp from "../components/signup";
import ShareLink from "../components/share";

export default function AppRouters() {
	return (
		<Switch>
			<Route component={ShareLink} path="/share" isPrivate />
			<Route component={Logout} path="/logout" isPrivate />
			<Route component={Login} path="/login" exact isAuth />
			<Route component={SignUp} path="/signup" exact isAuth />
			<Route component={Home} path="/" />
		</Switch>
	);
}
