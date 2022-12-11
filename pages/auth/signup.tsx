import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FaLock, FaMailBulk, FaUser } from "react-icons/fa";
import { HelpX, InputField, PasswordMetter } from "@component/Form";
import { AppContext } from "@context/App";
import { iUser } from "@type/modal";
import { validator } from "@util";
import { setClientToken } from "@util/token";
import api from "@api";

export default function SignupPage() {
	const router = useRouter();
	const appContext = useContext(AppContext);
	const [state, setState] = useState({
		input: {
			name: "",
			email: "",
			password: "",
		},
		error: {
			name: "",
			email: "",
			password: "",
			signup: "",
		},
	});

	const fOnInputChange = (key: string) => (e: any) => {
		setState((previous) => ({
			...previous,
			input: { ...previous.input, [key]: e.target.value },
		}));
	};
	const fSignupValidation = () => {
		const error = {
			name: validator("Name", state.input.name, {
				min: 4,
				require: true,
			}).first,
			email: validator("Email", state.input.email, {
				min: 8,
				require: true,
				pattern: new RegExp(/\w+\@\w+\.\w+/),
			}).first,
			password: validator("Password", state.input.password, {
				min: 8,
				small: true,
				capital: true,
				numeric: true,
				require: true,
				special: new RegExp(/[@_-]+/),
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
		const isValid = fSignupValidation();
		if (!isValid) return console.log("ERROR", state.error);

		// request for singup
		const request = await api.signup(state.input);
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
						Signup
					</h1>
					<p className="mt-1 text-xs text-center text-gray-500">
						Connect to the world.
					</p>
				</div>

				<form className="flex flex-col gap-2" onSubmit={fFormSubmit}>
					<InputField
						type="text"
						icon={FaUser}
						placeholder="Name"
						value={state.input.name}
						helpX={state.error.name}
						onChange={fOnInputChange("name")}
					/>
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
					<PasswordMetter value={state.input.password} />

					<button
						className="self-center px-6 py-1 text-gray-400 border-b-2 border-b-gray-800 hover:text-white hover:bg-blue-500 hover:border-b-blue-300"
						type="submit"
					>
						Signup
					</button>
					<HelpX state={state.error.signup}>
						<span className="-mt-1 block text-center">
							{state.error.signup}
						</span>
					</HelpX>

					<Link href={"/auth/login"}>
						<a className="group self-center text-sm text-gray-500">
							{"Have an any account?"}
							<span className="group-hover:text-blue-600 ml-1 font-semibold text-blue-400">
								Login
							</span>
						</a>
					</Link>
				</form>
			</div>
		</section>
	);
}
