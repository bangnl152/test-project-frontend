import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function RouteWrapper({ isPrivate, isAuth, roles, ...rest }) {
	const auth = useSelector((state) => state.auth);

	const signed = auth.signedIn === true && auth.user !== null;

	/**
	 * Redirect user to login page if he tries to access a private route
	 * without authentication.
	 */
	if (isPrivate == true && !signed) {
		console.log("redirect to main page");
		return <Redirect to="/" />;
	}
	/**
	 * Redirect user to Main page if he tries to access login page) after being authenticated.
	 */
	if (isAuth && signed) {
		console.log("redirect to main page");
		return <Redirect to="/" />;
	}

	/**
	 * If not included on previous cases, redirect user to the desired route.
	 */
	return <Route {...rest} />;
}
