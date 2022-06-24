import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";

import { AuthContext } from "../contexts/Auth";
function Profiles() {
	const { user, loading, name } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");
	}, [user, loading]);
	return (
		<div className="z-10 w-full flex justify-center relative">
			<div className="flex flex-col rounded-xl gap-y-2 p-6 my-4 mx-4 max-w-md bg-gray-200/75 backdrop-blur-md drop-shadow-md text-sky-800 items-center">
				<h1 className=" mb-3">Logged in as</h1>

				{user.photoURL ? (
					<img
						className="rounded-full h-24 w-24 mb-3"
						src={user.photoURL}
						alt="user avatar"
					/>
				) : (
					<SVG src="/images/icons/user.svg" className="h-24 w-24 mb-3" />
				)}

				<p>{name}</p>
				<p>{user?.email}</p>
			</div>
		</div>
	);
}
export default Profiles;
