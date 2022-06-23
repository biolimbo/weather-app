import React, { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import SVG from "react-inlinesvg";

import { UserContext } from "../contexts/User";
function Reports() {
	const { cities, addCity, loading } = useContext(UserContext);

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
		<div className="z-10 grid grid-cols-1 md:grid-cols-2  gap-4 items-center relative w-full p-6 max-w-5xl mx-auto">
			<div className="z-20 flex flex-col h-full rounded-xl gap-y-2 p-6 w-full bg-gray-200/75 backdrop-blur-md text-sky-700 items-center">
				<h1 className="">Add City</h1>
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
									className="text-sky-600 w-6  h-6 absolute top-1/2 -translate-y-1/2 right-2 z-20"
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
							className={`text-white w-6  h-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 transition-all duration-200 ease-in-out ${
								submitLoading ? "opacity-100" : "opacity-0"
							}`}
						/>
					</button>
					{generalError && <p className="error">{generalError}</p>}
				</form>
			</div>
			{loading ? (
				<SVG
					src="/images/icons/loading.svg"
					className="text-white w-32 h-32 mx-auto mt-16"
				/>
			) : (
				cities.map((city) => (
					<div
						key={city.id}
						className="flex flex-col h-full rounded-xl gap-y-2 p-6 w-full bg-gray-200/75 backdrop-blur-md text-sky-700 items-center"
					>
						<h2 className="h1">{city.name}</h2>
					</div>
				))
			)}
		</div>
	);
}
export default Reports;
