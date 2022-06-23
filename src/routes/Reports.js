import React, { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import SVG from "react-inlinesvg";

import { UserContext } from "../contexts/User";

import Alerts from "../components/Alerts";

function Reports() {
	const { cities, city, addCity, setCity, loading } = useContext(UserContext);

	const [generalError, setGeneralError] = useState("");

	const searchInput = useRef(null);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [cityOptions, setCityOptions] = useState([]);
	const [cityOptionsLoading, setCityOptionsLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const searchCity = async (e) => {
		setCityOptionsLoading(true);
		const city = e.target.value;
		if (city.length < 3) {
			setCityOptions([]);
			setCityOptionsLoading(false);
			return;
		}
		const response = await fetch(
			`http://api.weatherapi.com/v1/search.json?key=d884d9d738e24e7ab78224621222206&q=${city}`
		);
		const data = await response.json();
		if (data.cod === "404") {
			setCityOptions([]);
			setGeneralError("City not found");
			setCityOptionsLoading(false);
			return;
		}
		setCityOptions(data);
		setCityOptionsLoading(false);
	};

	const selectCity = (city) => {
		setCityOptions([]);
		setGeneralError("");
		setIsInputFocused(false);
		setValue("name", city);
		searchInput.current.value = city;

		//console.log("CHECKING", city);
	};

	const onSubmit = async (data) => {
		if (submitLoading) return;
		setSubmitLoading(true);
		await addCity(data);
		setSubmitLoading(false);
	};

	return (
		<>
			{city && !loading && <Alerts />}
			<div className="z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center relative w-full p-6 max-w-5xl mx-auto">
				<div className="z-20 report-container">
					<h1 className="w-full drop-shadow ">Add City</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="w-full z-20">
							<label>City Name</label>
							<div className="w-full relative">
								<input
									placeholder="City Name"
									{...register("name", {
										required: "City Name is required",
									})}
									className="hidden"
								/>
								<input
									ref={searchInput}
									className="z-10 relative"
									placeholder="Search & select city"
									onInput={searchCity}
									onFocus={() => setIsInputFocused(true)}
									onBlur={() => {
										setTimeout(() => {
											//console.log("CHECKING");
											setIsInputFocused(false);
										}, 150);
									}}
								/>
								{cityOptionsLoading && (
									<SVG
										src="/images/icons/loading.svg"
										className="w-6  h-6 absolute top-1/2 -translate-y-1/2 right-2 z-20"
									/>
								)}

								{isInputFocused && !!cityOptions.length && (
									<div className="bg-white border-2 border-sky-300 rounded-b-md absolute top-full left-0 right-0 p-2 max-h-56  overflow-y-auto gap-y-1">
										{cityOptions.map((city) => (
											<p
												key={city.id}
												className="border-b border-gray-200 last:border-0 w-full p-2 cursor-pointer"
												onClick={() => {
													selectCity(city.name);
												}}
											>
												{city.name}
											</p>
										))}
									</div>
								)}
							</div>

							{errors.name && <p className="error">{errors.name.message}</p>}
						</div>

						<button
							type="submit"
							className="relative btn-sky-600"
							disabled={submitLoading}
						>
							<span
								className={`transition-all duration-200 ease-in-out ${
									submitLoading ? "opacity-0" : "opacity-100"
								}`}
							>
								Add
							</span>
							<SVG
								src="/images/icons/loading.svg"
								className={` w-6  h-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 transition-all duration-200 ease-in-out ${
									submitLoading ? "opacity-100" : "opacity-0"
								}`}
							/>
						</button>
						{generalError && <p className="error">{generalError}</p>}
					</form>
				</div>
				{loading ? (
					<div className="min-h-[215px] w-full flex justify-center items-center">
						<SVG
							src="/images/icons/loading.svg"
							className="text-slate-800 w-32 h-32"
						/>
					</div>
				) : (
					cities.map((city) => (
						<div
							key={city.id}
							className={`report-container  hover:scale-105 scale-100 select-none cursor-pointer ${
								city.current?.is_day ? "day-container" : "night-container"
							}`}
							onClick={() => {
								setCity(city);
							}}
						>
							<h2 className="h1 drop-shadow w-full">{city.name}</h2>
							<div className="absolute top-0 right-0 w-16 h-auto m-3">
								<img
									src={"https:" + city.current?.condition?.icon}
									alt={city.current?.condition?.text}
									className="w-full h-full"
								/>
							</div>
							<p className="w-full text-[2.5rem] leading-snug font-semibold">
								{city.current?.temp_c + "°"}
							</p>
							<div className="w-full flex flex-col mt-auto">
								<div className="flex items-center">
									<SVG
										className="w-4 h-auto"
										src="/images/icons/humidity.svg"
									/>
									<p className="ml-2">{city.current?.humidity + "%"}</p>
								</div>
								<div className="flex items-center">
									<SVG className="w-4 h-auto" src="/images/icons/wind.svg" />
									<p className="ml-2">{city.current?.wind_kph + " kph"}</p>
								</div>
								<div className="flex items-center">
									<SVG className="w-4 h-auto" src="/images/icons/clock.svg" />
									<p className="ml-2">{city.location?.localtime}</p>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
}
export default Reports;
