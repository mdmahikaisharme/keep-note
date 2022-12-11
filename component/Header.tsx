import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaClock, FaEllipsisV, FaRegSun } from "react-icons/fa";
import { BtnRound } from "@component/Button";
import { Search, User } from "@component";
import { useAppContext } from "@context/App";
import { cls } from "@util";

export default function Header() {
	const appContext = useAppContext();
	const ref = {
		sidebarToggler: useRef({} as HTMLDivElement),
	};

	// set sidebar toggler ref
	useEffect(() => {
		appContext.dispatch({
			type: "SET_SIDEBAR_TOGGLER_REF",
			payload: ref.sidebarToggler,
		});
	}, []);

	return (
		<header
			className={cls(
				"w-full h-14 px-2 sticky left-0 top-0 z-10 flex items-center gap-2 bg-gray-900 border-b-2 border-b-gray-800",
				"md:px-4 md:gap-4"
			)}
		>
			{/* toggler */}
			<BtnRound
				icon={FaEllipsisV}
				color="white"
				onClick={() => appContext.dispatch({ type: "TOOGLE_SIDEBAR" })}
				Ref={ref.sidebarToggler}
			/>

			<Link href="/">
				<a className="text-xl font-semibold flex items-center gap-2 text-gray-300">
					Keep
				</a>
			</Link>

			<Search />

			<div className="flex items-center gap-1">
				<BtnRound icon={FaClock} />
				<BtnRound icon={FaRegSun} />
				<BtnRound
					icon={FaRegSun}
					className="w-max py-1 absolute top-[calc(100%+1rem)] right-0 z-10 flex flex-col bg-gray-900 border-2 border-gray-800"
				>
					<div className="w-full px-3 py-1 text-sm font-semibold text-gray-300 select-none cursor-pointer hover:bg-gray-800">
						Setting
					</div>
					<div className="w-full px-3 py-1 text-sm font-semibold text-gray-300 select-none cursor-pointer hover:bg-gray-800">
						Toggle dark theme
					</div>
					<div className="w-full px-3 py-1 text-sm font-semibold text-gray-300 select-none cursor-pointer hover:bg-gray-800">
						Send feedback
					</div>
					<div className="w-full px-3 py-1 text-sm font-semibold text-gray-300 select-none cursor-pointer hover:bg-gray-800">
						Help
					</div>
					<div className="w-full px-3 py-1 text-sm font-semibold text-gray-300 select-none cursor-pointer hover:bg-gray-800">
						App downloads
					</div>
					<div className="w-full px-3 py-1 text-sm font-semibold text-gray-300 select-none cursor-pointer hover:bg-gray-800">
						Keyboard shortcuts
					</div>
				</BtnRound>
			</div>

			<div className="flex items-center gap-1">
				<BtnRound icon={FaRegSun} color="white" />
				<User />
			</div>
		</header>
	);
}
