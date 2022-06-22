import React, { useState, useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";

import { query, collection, getDocs, where } from "firebase/firestore";

import { auth, db, logout } from "../utils/firabase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [user, loading, error] = useAuthState(auth);

	const [name, setName] = useState("");
	const fetchUserName = async () => {
		try {
			if (!user) return;
			const q = query(collection(db, "users"), where("uid", "==", user?.uid));
			const doc = await getDocs(q);
			const data = doc.docs[0].data();
			setName(data.name);
		} catch (err) {
			console.error(err);
			//alert("An error occured while fetching user data");
		}
	};

	useEffect(() => {
		fetchUserName();
	}, [user, loading]);

	return (
		<AuthContext.Provider value={{ user, loading, error, name, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
