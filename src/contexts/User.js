import React, { useState, useEffect, useContext } from "react";

import { query, collection, getDocs, where, addDoc } from "firebase/firestore";

import { AuthContext } from "./Auth";
import { db } from "../utils/firabase";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const { user } = useContext(AuthContext);

	const [cities, setCities] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchUserCities = async () => {
		setLoading(true);
		try {
			if (!user) return;
			const q = query(collection(db, "cities"), where("uid", "==", user?.uid));
			const docsQuery = await getDocs(q);
			const docsPromises = docsQuery.docs.map(async (doc) => {
				const data = await doc.data();
				return { ...data, id: doc.id };
			});
			const docs = await Promise.all(docsPromises);
			console.log("checking cities", docs);
			setCities(docs);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setLoading(false);
			//alert("An error occured while fetching user data");
		}
	};

	const addCity = async (city) => {
		setLoading(true);
		try {
			if (!user) return;
			const cityAlreadyExists = cities.find((c) => c.name === city.name);
			if (cityAlreadyExists) return;
			await addDoc(collection(db, "cities"), {
				uid: user.uid,
				...city,
			});
			await fetchUserCities();
			setLoading(false);
		} catch (err) {
			console.error(err);
			//alert("An error occured while adding city");
			setLoading(false);
		}
	};

	const removeCity = async (city) => {
		setLoading(true);
		try {
			if (!user) return;
			await db.collection("cities").doc(city.id).delete();
			await fetchUserCities();
			setLoading(false);
		} catch (err) {
			console.error(err);
			//alert("An error occured while removing city");
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserCities();
	}, [user]);

	return (
		<UserContext.Provider value={{ cities, loading, addCity, removeCity }}>
			{children}
		</UserContext.Provider>
	);
};
