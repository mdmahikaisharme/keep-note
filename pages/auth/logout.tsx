import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AppContext } from "@context/App";
import { clearClientToken } from "@util/token";
import api from "@api";

export default function LogoutPage() {
	const appContext = useContext(AppContext);
	const router = useRouter();

	const fLogout = async () => {
		// request for logout
		const request = await api.logout();
		if (request.status !== 200) alert("Try one more.");

		// LOGOUT
		await clearClientToken();

		appContext.dispatch({ type: "LOGOUT" });
		router.replace("/auth/login");
	};

	useEffect(() => {
		(async () => await fLogout())();
	}, []);

	return (
		<section className="flex items-center justify-center h-screen bg-gray-900">
			<div className="w-[325px] px-8 py-6 flex flex-col bg-gray-900 border-2 border-gray-800 rounded-md shadow-lg">
				<h2 className="text-xl text-gray-300">Logout...</h2>
			</div>
		</section>
	);
}
