import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoutes";

import Reports from "./routes/Reports";
import Alerts from "./routes/Alerts";

import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Reset from "./routes/Reset";

import reportWebVitals from "./reportWebVitals";

import { AuthProvider } from "./contexts/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<div id="body" className="bg-gradient-to-t from-cyan-500 to-blue-500">
				<Router>
					<Navbar />
					<Routes>
						<Route
							path="/"
							element={
								<PrivateRoute>
									<Reports />
								</PrivateRoute>
							}
						/>
						<Route
							path="/alerts"
							element={
								<PrivateRoute>
									<Alerts />
								</PrivateRoute>
							}
						/>
						<Route path="/signin" element={<Signin />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/reset" element={<Reset />} />
					</Routes>
				</Router>
			</div>
		</AuthProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
