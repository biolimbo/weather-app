import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db, logout } from "../utils/firabase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { AuthContext } from "../contexts/Auth";
function Reports() {
	const { user, loading } = useContext(AuthContext);
	const [name, setName] = useState("");
	const navigate = useNavigate();
	const fetchUserName = async () => {
		try {
			const q = query(collection(db, "users"), where("uid", "==", user?.uid));
			const doc = await getDocs(q);
			const data = doc.docs[0].data();
			setName(data.name);
		} catch (err) {
			console.error(err);
			alert("An error occured while fetching user data");
		}
	};
	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");
		console.log("USER", user);
		fetchUserName();
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
