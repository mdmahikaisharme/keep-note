import { useState } from "react";
import { motion } from "framer-motion";
import { HelpX } from ".";
import { IconPicker } from "@util";
import { tIcon } from "@type/util";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface iInputField {
	type?: "text" | "email" | "password";
	name?: string;
	icon?: tIcon;
	placeholder?: string;
	value?: string;
	helpX?: string;
	onChange?: (e: any) => void;
	children?: JSX.Element;
}

export default function InputField(props: iInputField) {
	const { type, icon, helpX, children, ...extraProps } = props;
	const [state, setState] = useState({
		type,
		isPassword: type === "password",
		showPassword: false,
	});

	const fShowPassword = () => {
		setState((oldValue) =>
			Object({
				...oldValue,
				type: "password",
				showPassword: false,
			})
		);
	};
	const fHidePassword = () => {
		setState((oldValue) =>
			Object({
				...oldValue,
				type: "text",
				showPassword: true,
			})
		);
	};

	return (
		<div className="flex flex-col gap-1 transition-all">
			<motion.div
				className={`w-full px-1 py-1 relative flex items-center gap-2 border-b-2 border-b-gray-800 transition-all after:content-[''] after:w-0 focus-within:after:w-full after:h-[2px] after:absolute after:left-0 after:top-full after:transition-all ${
					helpX
						? "hover:after:bg-red-400 focus-within:after:bg-red-400"
						: "hover:after:bg-blue-400 focus-within:after:bg-blue-400"
				}`}
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: "auto" }}
			>
				<div className="flex-none w-5 h-5 grid place-items-center pointer-events-none">
					<IconPicker className="text-gray-300" icon={icon} />
				</div>

				<input
					className="w-full bg-transparent text-gray-300 outline-none v"
					type={state.type}
					{...extraProps}
				/>

				{/* toggler password */}
				{state.isPassword &&
					(state.showPassword ? (
						<div
							className="flex-none w-4 h-4 grid place-items-center cursor-pointer select-none"
							onClick={fShowPassword}
						>
							<IconPicker
								className="text-gray-500"
								icon={FaEye}
							/>
						</div>
					) : (
						<div
							className="flex-none w-4 h-4 grid place-items-center cursor-pointer select-none"
							onClick={fHidePassword}
						>
							<IconPicker
								className="text-gray-500"
								icon={FaEyeSlash}
							/>
						</div>
					))}
			</motion.div>

			{/* helpX */}
			<HelpX state={helpX}>{helpX}</HelpX>
		</div>
	);
}
