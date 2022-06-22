import React from "react";

import { auth } from "../utils/firabase";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [user, loading, error] = useAuthState(auth);

	//console.log("CHECKING FIREBASE", auth);

	return (
		<AuthContext.Provider value={{ user, loading, error }}>
			{children}
		</AuthContext.Provider>
	);
};
