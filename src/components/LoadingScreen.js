import { useContext } from "react";
import SVG from "react-inlinesvg";

import { AuthContext } from "../contexts/Auth";

function LoadingScreen() {
	const { loading } = useContext(AuthContext);

	return (
		<>
			{loading && (
				<div className="fixed w-screen h-screen bg-gradient-to-t from-cyan-500 to-blue-500 z-50 top-0 left-0 flex justify-center items-center">
					<SVG
						src="/images/icons/loading.svg"
						className="text-white w-48 h-48 "
					/>
				</div>
			)}
		</>
	);
}

export default LoadingScreen;
