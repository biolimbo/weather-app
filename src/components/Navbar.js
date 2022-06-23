import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../contexts/Auth";

function CustomLink({
	children,
	to,
	className,
	activeClassName = "",
	...props
}) {
	return (
		<div>
			<NavLink
				to={to}
				className={({ isActive }) =>
					`${className} ${isActive ? activeClassName + " active" : ""}`
				}
				{...props}
			>
				{children}
			</NavLink>
		</div>
	);
}

function Navbar() {
	const { user, name, logout } = useContext(AuthContext);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	return (
		<header className="relative z-50">
			<nav className="px-3 sm:px-6 py-4 rounded-b-lg bg-sky-800/[.65] backdrop-blur-md drop-shadow-md">
				<div className="container flex flex-wrap justify-between items-center mx-auto">
					<a href="/" className="flex items-center">
						<img
							src="/weather-app.svg"
							className="mr-3 h-6 sm:h-9"
							alt="Weather App Logo"
						/>
						<span className="self-center text-xl font-semibold drop-shadow-md whitespace-nowrap dark:text-white">
							Weather App
						</span>
					</a>
					<div className="flex items-center md:order-2">
						{user && (
							<div className="flex items-center relative z-50">
								<button
									type="button"
									className={`flex mr-3 text-sm rounded-full md:mr-0 ${
										isUserMenuOpen ? "ring-4 ring-gray-300" : ""
									}`}
									id="user-menu-button"
									aria-expanded="false"
									data-dropdown-toggle="dropdown"
									onClick={() => {
										setIsUserMenuOpen(!isUserMenuOpen);
										setIsMenuOpen(false);
									}}
								>
									<span className="sr-only">Open user menu</span>
									<img
										className="w-8 h-8 rounded-full"
										src={user.photoURL ?? "/images/icons/user.svg"}
										alt="user avatar"
									/>
								</button>
							</div>
						)}

						<button
							data-collapse-toggle="mobile-menu-2"
							type="button"
							className={`inline-flex items-center p-2 ml-1 text-sm text-neutral-200 rounded-lg md:hidden focus:outline-none ${
								isMenuOpen ? "!bg-gray-100 !text-gray-700" : ""
							}`}
							aria-controls="mobile-menu-2"
							aria-expanded="false"
							onClick={() => {
								setIsMenuOpen(!isMenuOpen);
								setIsUserMenuOpen(false);
							}}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"
								></path>
							</svg>
							<svg
								className="hidden w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</div>

					<div
						className={`justify-between items-center w-full md:flex md:w-auto md:order-1"
						id="mobile-menu-2 ${isMenuOpen ? "block" : "hidden"}`}
					>
						<ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
							<li>
								<CustomLink to="/" className="nav-link">
									Reports
								</CustomLink>
							</li>
							<li>
								<CustomLink to="/alerts" className="nav-link">
									Alerts
								</CustomLink>
							</li>
						</ul>
					</div>
				</div>

				<div
					className={` z-50 w-fit mt-0 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${
						isUserMenuOpen ? "absolute top-full right-0" : "hidden"
					}`}
					id="dropdown"
				>
					<div className="py-3 px-4">
						<span className="block text-sm text-gray-900 dark:text-white">
							{name}
						</span>
						<span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
							{user?.email}
						</span>
					</div>
					<ul className="py-1" aria-labelledby="dropdown">
						<li>
							<CustomLink
								to="/profile"
								className="text-left w-full block py-2 px-4 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
								activeClassName="!bg-gray-600 !text-white"
							>
								Profile
							</CustomLink>
						</li>
						<li>
							<button
								className="text-left w-full block py-2 px-4 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
								onClick={logout}
							>
								Sign out
							</button>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
