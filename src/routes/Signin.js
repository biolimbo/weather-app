import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword, signInWithGoogle } from "../utils/firabase";
import { AuthContext } from "../contexts/Auth";
function Auth() {
	const { user, loading } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		if (loading) {
			// maybe trigger a loading screen
			return;
		}
		if (user) navigate("/");
	}, [user, loading]);
	return (
		<div className=" w-full flex justify-center relative">
			<div className="flex flex-col rounded-xl gap-y-3 p-6 my-4 mx-4 max-w-md bg-gray-200/75 backdrop-blur-md drop-shadow-md text-sky-800 items-center">
				<h1 className=" mb-3">Log in</h1>
				<input
					type="text"
					className="login__textBox"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="E-mail Address"
				/>
				<input
					type="password"
					className="login__textBox"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button
					className=" btn-sky-600"
					onClick={() => logInWithEmailAndPassword(email, password)}
				>
					Login
				</button>
				<button className=" btn-sky-600" onClick={signInWithGoogle}>
					Login with Google
				</button>
				<Link className="" to="/reset">
					Forgot Password
				</Link>
				<div>
					Don't have an account? <Link to="/signup">Register</Link> now.
				</div>
			</div>
		</div>
	);
}
export default Auth;
