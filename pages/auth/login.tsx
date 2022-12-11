import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FaLock, FaMailBulk } from "react-icons/fa";
import { HelpX, InputField } from "@component/Form";
import { AppContext } from "@context/App";
import { iUser } from "@type/modal";
import { validator } from "@util";
import { setClientToken } from "@util/token";
import api from "@api";

export default function LoginPage() {
	const appContext = useContext(AppContext);
	const router = useRouter();
	const [state, setState] = useState({
		input: {
			email: "",
			password: "",
		},
		error: {
			email: "",
			password: "",
			login: "",
		},
	});

	const fOnInputChange = (key: string) => (e: any) => {
		setState((previous) => ({
			...previous,
			input: { ...previous.input, [key]: e.target.value },
		}));
	};
	const fLoginValidation = () => {
		const error = {
			email: validator("Email", state.input.email, {
				require: true,
				pattern: new RegExp(/\w+\@\w+\.\w+/),
			}).first,
			password: validator("Password", state.input.password, {
				require: true,
			}).first,
		};

		// Update Error State
		setState((previous) => ({
			...previous,
			error: { ...previous.error, ...error },
		}));

		return !Object.entries(error).some((item) => item[1]);
	};
	const fFormSubmit = async (e: any) => {
		e.preventDefault();

		// Validation
		const isValid = fLoginValidation();
		if (!isValid) return console.log("ERROR", state.error);

		// request for login
		const request = await api.login(state.input);
		if (request.status !== 200) return alert("Try one more.");

		// LOGIN
		const { user, accessToken, refreshToken } = request.data;
		await setClientToken(accessToken, refreshToken);

		appContext.dispatch({ type: "LOGIN", payload: user as iUser });
		router.replace("/");
	};

	return (
		<section className="flex items-center justify-center h-screen bg-gray-900">
			<div className="w-[325px] px-8 py-6 flex flex-col bg-gray-900 border-2 border-gray-800 rounded-md shadow-lg">
				<div className="mt-2 mb-8">
					<h1 className="text-2xl font-semibold text-center text-gray-300">
						Login
					</h1>
					<p className="mt-1 text-xs text-center text-gray-500">
						Connect to the world.
					</p>
				</div>

				<form className="flex flex-col gap-2" onSubmit={fFormSubmit}>
					<InputField
						type="text"
						icon={FaMailBulk}
						placeholder="Email"
						value={state.input.email}
						helpX={state.error.email}
						onChange={fOnInputChange("email")}
					/>
					<InputField
						type="password"
						icon={FaLock}
						placeholder="Password"
						value={state.input.password}
						helpX={state.error.password}
						onChange={fOnInputChange("password")}
					/>

					<button
						className="self-center px-6 py-1 text-gray-400 border-b-2 border-b-gray-800 hover:text-white hover:bg-blue-500 hover:border-b-blue-300"
						type="submit"
					>
						Login
					</button>
					<HelpX state={state.error.login}>
						<span className="-mt-1 block text-center">
							{state.error.login}
						</span>
					</HelpX>

					<Link href={"/auth/signup"}>
						<a className="group self-center text-sm text-gray-500">
							{"Haven't any account?"}
							<span className="group-hover:text-blue-600 ml-1 font-semibold text-blue-400">
								Signup
							</span>
						</a>
					</Link>
				</form>
			</div>
		</section>
	);
}
