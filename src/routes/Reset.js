import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../utils/firabase";
function Reset() {
	const [email, setEmail] = useState("");
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();
	useEffect(() => {
		if (loading) return;
		if (user) navigate("/");
	}, [user, loading]);
	return (
		<div className=" w-full flex justify-center relative">
			<div className="flex flex-col rounded-xl gap-y-3 p-6 my-4 mx-4 max-w-md bg-gray-200/75 backdrop-blur-md drop-shadow-md text-sky-800 items-center">
				<h1 className=" mb-3">Reset password</h1>
				<input
					type="text"
					className="reset__textBox"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="E-mail Address"
				/>
				<button
					className=" btn-sky-600"
					onClick={() => sendPasswordReset(email)}
				>
					Send password reset email
				</button>
				<div>
					Don't have an account? <Link to="/signup">Register now</Link>.
				</div>
			</div>
		</div>
	);
}
export default Reset;
