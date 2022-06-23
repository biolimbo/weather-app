import React, { useContext, useEffect } from "react";
import SVG from "react-inlinesvg";

import { UserContext } from "../contexts/User";

function ReportContainer({ city }) {
	const { setCity, activeAlerts, alerts, triggerAlerts } =
		useContext(UserContext);

	const cityName = city.name.replaceAll(" ", "_");

	useEffect(() => {
		if (alerts[cityName]) triggerAlerts();
	}, [alerts[cityName]]);

	return (
		<div
			key={city.id}
			className={`report-container  hover:scale-105 scale-100 select-none cursor-pointer ${
				city.current?.is_day ? "day-container" : "night-container"
			}`}
			onClick={() => {
				setCity(city);
			}}
		>
			<div className="w-full">
				<h2 className="h1 drop-shadow w-full">{city.name}</h2>
				<h3 className="w-full text-lg font-medium">{city.location.country}</h3>
			</div>
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
					<SVG className="w-4 h-auto" src="/images/icons/humidity.svg" />
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
			{!!activeAlerts[cityName]?.length &&
				activeAlerts[cityName].map((alert) => (
					<div
						key={alert.id}
						className="w-full flex mt-auto rounded-lg bg-rose-600 text-white py-2 px-3 items-center justify-start"
					>
						<SVG src="/images/icons/alert.svg" className="w-5 h-5 mr-2" />
						<p className="w-full font-medium leading-tight text-sm">{`Temperature is ${alert.type} than ${alert.value}°`}</p>
					</div>
				))}
		</div>
	);
}

export default ReportContainer;
