import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/firabase";

import { AuthContext } from "../contexts/Auth";
function Reports() {
	const { user, loading, name } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");
	}, [user, loading]);
	return (
		<div className="dashboard">
			<div className="dashboard__container">
				Logged in as
				<div>{name}</div>
				<div>{user?.email}</div>
				<button className="dashboard__btn" onClick={logout}>
					Logout
				</button>
			</div>
		</div>
	);
}
export default Reports;
