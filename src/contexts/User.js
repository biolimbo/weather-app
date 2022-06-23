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
			let docs = await Promise.all(docsPromises);
			docs = docs.sort(function (a, b) {
				var textA = a.name.toUpperCase();
				var textB = b.name.toUpperCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});
			await getCurrentWeather(docs);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setLoading(false);
			//alert("An error occured while fetching user data");
		}
	};

	const getCurrentWeather = async (docs) => {
		if (!docs.length) {
			return;
		}

		const promises = docs.map(async (city) => {
			const response = await fetch(
				`http://api.weatherapi.com/v1/current.json?key=d884d9d738e24e7ab78224621222206&q=${city.name}`
			);
			const data = await response.json();
			return { ...data, ...city };
		});

		const data = await Promise.all(promises);

		setCities(data);
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
		console.log("fetching user cities");
		fetchUserCities();
	}, [user]);

	return (
		<UserContext.Provider value={{ cities, loading, addCity, removeCity }}>
			{children}
		</UserContext.Provider>
	);
};
