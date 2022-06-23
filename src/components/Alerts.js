import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { UserContext } from "../contexts/User";

import SVG from "react-inlinesvg";

function Alerts() {
	const { city, setCity, removeCity, addAlert, removeAlert, alerts } =
		useContext(UserContext);

	const [submitLoading, setSubmitLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const onSubmit = async (data) => {
		if (submitLoading) return;
		setSubmitLoading(true);
		//console.log("SUBMITTING", data);
		await addAlert({ ...data, parameter: "temp_c" });
		setValue("type", "Alert type");
		setValue("value", "");
		setSubmitLoading(false);
	};

	return (
		<div className="bg-black/70  backdrop-blur-lg fixed w-screen h-screen top-0 left-0 z-20 flex justify-center items-center p-4 pt-[76px]">
			<div className="w-full max-w-xl flex flex-col items-center bg-slate-200 text-slate-800 rounded-lg p-6 max-h-[80vh] overflow-y-auto mb-0 md:mb-16 relative">
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

				<div className="my-4 w-full flex flex-col items-center justify-center gap-y-2">
					<h2 className="w-full">Alerts</h2>
					<form className="gap-y-0" onSubmit={handleSubmit(onSubmit)}>
						<div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 py-3">
							<select
								defaultValue="Alert type"
								{...register("type", {
									required: "Alert type is required",
									validate: {
										required: (value) =>
											value !== "Alert type" ? true : "Choose an alert type",
									},
								})}
							>
								<option disabled>Alert type</option>
								<option value="greater">Temperature greater than</option>
								<option value="minor">Temperature lower than</option>
							</select>
							<input
								placeholder="Value"
								type="number"
								{...register("value", {
									required: "Value is required",
								})}
								className=""
							/>
							<button
								type="submit"
								className="relative btn-sky-600 py-[0.35rem]"
								disabled={submitLoading}
							>
								<div className="w-6 h-6"></div>
								<SVG
									src="/images/icons/cancel.svg"
									className={` w-6  h-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 transition-all duration-200 ease-in-out rotate-45 ${
										submitLoading ? "opacity-0" : "opacity-100"
									}`}
								/>
								<SVG
									src="/images/icons/loading.svg"
									className={` w-6  h-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 transition-all duration-200 ease-in-out ${
										submitLoading ? "opacity-100" : "opacity-0"
									}`}
								/>
							</button>
						</div>
						{!!Object.keys(errors).length &&
							Object.keys(errors).map((key) => {
								return (
									<p key={`error-${key}`} className="error">
										{errors[key].message}
									</p>
								);
							})}
					</form>
					{alerts?.[city.name.replaceAll(" ", "")]?.map((alert) => {
						return (
							<div
								key={`aler-${alert.id}`}
								className="w-full flex flex-col md:flex-row items-center justify-between gap-3 border-t-2 border-slate-300  py-3"
							>
								<select defaultValue={alert.type} disabled={true}>
									<option disabled>Alert type</option>
									<option value="greater">Temperature greater than</option>
									<option value="minor">Temperature lower than</option>
								</select>
								<input
									placeholder="Value"
									type="number"
									defaultValue={alert.value}
									disabled={true}
								/>

								<button
									type="submit"
									className="relative btn-rose-600 py-[0.35rem]"
									disabled={submitLoading}
									onClick={async () => {
										if (submitLoading) return;
										setSubmitLoading(true);
										await removeAlert(alert.id);
										setSubmitLoading(false);
									}}
								>
									<div className="w-6 h-6"></div>
									<SVG
										src="/images/icons/trash.svg"
										className={` w-6  h-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 transition-all duration-200 ease-in-out ${
											submitLoading ? "opacity-0" : "opacity-100"
										}`}
									/>
									<SVG
										src="/images/icons/loading.svg"
										className={` w-6  h-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 transition-all duration-200 ease-in-out ${
											submitLoading ? "opacity-100" : "opacity-0"
										}`}
									/>
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Alerts;
