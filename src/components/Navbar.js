import React, { useContext, useState, useLayoutEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

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
	const location = useLocation();

	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	useLayoutEffect(() => {
		setIsUserMenuOpen(false);
	}, [location]);

	return (
		<header className="fixed z-50 w-full top-0">
			<nav className="px-3 sm:px-6 py-4 rounded-b-lg bg-gradient-to-b  from-sky-700/90 to-sky-600/60 backdrop-blur-md drop-shadow-md">
				<div className="container flex flex-wrap justify-between items-center mx-auto">
					<Link to="/" className="flex items-center">
						<img
							src="/weather-app.svg"
							className="mr-3 h-6 sm:h-9"
							alt="Weather App Logo"
						/>
						<span className="self-center text-2xl font-semibold drop-shadow-md whitespace-nowrap dark:text-white">
							Weather App
						</span>
					</Link>
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
							<CustomLink to="/profile" className="nav-link">
								Profile
							</CustomLink>
						</li>
						<li>
							<button
								className="nav-link"
								onClick={() => {
									setIsUserMenuOpen(false);
									logout();
								}}
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
