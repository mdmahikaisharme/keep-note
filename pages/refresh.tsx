import { useRouter } from "next/router";
import { useEffect } from "react";
import {
	buildClientCookie,
	clearClientToken,
	setClientToken,
} from "@util/token";
import api from "@api";

export default function RefreshPage() {
	const router = useRouter();

	const refreshingTokens = async () => {
		// validate cookie
		const cookies = await buildClientCookie();

		// request for login
		const request = await api.refresh(cookies);
		if (request.status !== 200) {
			await clearClientToken();
			return router.replace("/auth/login");
		}

		// set token
		const { accessToken, refreshToken } = request.data;
		await setClientToken(accessToken, refreshToken);

		router.replace("/");
	};

	useEffect(() => {
		refreshingTokens();
	}, []);

	return (
		<section className="flex items-center justify-center h-screen bg-gray-900">
			<div className="w-[325px] px-8 py-6 flex flex-col bg-gray-900 border-2 border-gray-800 rounded-md shadow-lg">
				<h2 className="text-xl text-gray-300">Login...</h2>
			</div>
		</section>
	);
}
