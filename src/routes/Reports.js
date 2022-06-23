import React, { useContext, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import SVG from "react-inlinesvg";

import { UserContext } from "../contexts/User";

import Alerts from "../components/Alerts";
import ReportContainer from "../components/ReportContainer";

function Reports() {
	const {
		alerts,
		cities,
		city,
		addCity,
		fetchUserCities,
		loading,
		fetchAllAlerts,
		triggerAlerts,
	} = useContext(UserContext);

	const searchInput = useRef(null);

	const [generalError, setGeneralError] = useState("");

	const [seed, setSeed] = useState(Math.random());

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
			`https://api.weatherapi.com/v1/search.json?key=d884d9d738e24e7ab78224621222206&q=${city}`
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

	useEffect(() => {
		fetchAllAlerts();
	}, [cities, seed]);

	useEffect(() => {
		triggerAlerts();
	}, [alerts]);

	useEffect(() => {
		setInterval(async () => {
			await fetchUserCities();
			setSeed(Math.random());
		}, 60000);
	}, []);

	return (
		<>
			{city && <Alerts />}
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
												{city.name}, {city.country}
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
				{loading && !cities.length ? (
					<div className="min-h-[215px] w-full flex justify-center items-center">
						<SVG
							src="/images/icons/loading.svg"
							className="text-slate-800 w-32 h-32"
						/>
					</div>
				) : (
					cities.map((city) => <ReportContainer key={city.id} city={city} />)
				)}
			</div>
		</>
	);
}
export default Reports;
