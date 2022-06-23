import React, { useContext } from "react";
/* import { useForm } from "react-hook-form";
 */
import { UserContext } from "../contexts/User";

import SVG from "react-inlinesvg";

function Alerts() {
	const { city, setCity, removeCity } = useContext(UserContext);

	/* const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm(); */

	return (
		<div className="bg-black/70  backdrop-blur-lg fixed w-screen h-screen top-0 left-0 z-20 flex justify-center items-center p-4">
			<div className="w-full max-w-xl flex flex-col items-center justify-center bg-slate-200 text-slate-800 rounded-lg p-6 mb-8 md:mb-16 relative">
				<div className="absolute top-0 right-0 flex  m-6 gap-x-4">
					<div
						className="text-slate-800 hover:text-slate-200 hover:bg-rose-800 transition-all duration-300 ease-in-out rounded-full w-10 h-10 cursor-pointer p-2"
						onClick={() => {
							removeCity(city);
						}}
					>
						<SVG src="/images/icons/trash.svg" className="w-full h-full" />
					</div>
					<div
						className="text-slate-800 hover:text-slate-200 hover:bg-slate-800 transition-all duration-300 ease-in-out rounded-full w-10 h-10 cursor-pointer p-1"
						onClick={() => {
							setCity(null);
						}}
					>
						<SVG src="/images/icons/cancel.svg" className="w-full h-full" />
					</div>
				</div>
				<h1 className="w-full  text-3xl font-bold">{city.name}</h1>
			</div>
		</div>
	);
}

export default Alerts;
