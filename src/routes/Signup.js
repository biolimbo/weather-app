import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	registerWithEmailAndPassword,
	signInWithGoogle,
} from "../utils/firabase";

import { AuthContext } from "../contexts/Auth";

function Register() {
	const { user, loading } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	let navigate = useNavigate();
	const register = () => {
		if (!name) alert("Please enter name");
		registerWithEmailAndPassword(name, email, password);
	};

	useEffect(() => {
		if (loading) return;
		if (user) navigate("/", { replace: true });
	}, [user, loading]);
	return (
		<div className=" w-full flex justify-center relative">
			<div className="flex flex-col rounded-xl gap-y-3 p-6 my-4 mx-4 max-w-md bg-gray-200/75 backdrop-blur-md drop-shadow-md text-sky-800 items-center">
				<h1 className=" mb-3">Log in</h1>
				<input
					type="text"
					className="register__textBox"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Full Name"
				/>
				<input
					type="text"
					className="register__textBox"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="E-mail Address"
				/>
				<input
					type="password"
					className="register__textBox"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button className=" btn-sky-600" onClick={register}>
					Register
				</button>
				<button className=" btn-sky-600" onClick={signInWithGoogle}>
					Register with Google
				</button>
				<div>
					Already have an account? <Link to="/signin">Login now</Link>.
				</div>
			</div>
		</div>
	);
}
export default Register;
