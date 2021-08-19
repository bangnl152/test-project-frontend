import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../app-redux/actions/auth";

export default function Logout() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logout());
	}, []);
	return <div></div>;
}
