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
		<div className="register">
			<div className="register__container">
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
				<button className="register__btn" onClick={register}>
					Register
				</button>
				<button
					className="register__btn register__google"
					onClick={signInWithGoogle}
				>
					Register with Google
				</button>
				<div>
					Already have an account? <Link to="/signin">Login</Link> now.
				</div>
			</div>
		</div>
	);
}
export default Register;
