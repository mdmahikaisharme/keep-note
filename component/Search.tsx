import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { cls } from "@util";
import { useOutsideClick } from "@hook";

export default function Search() {
	const [isShow, setIsShow] = useState(false);
	const ref = useRef({} as HTMLDivElement);

	useOutsideClick([ref], isShow, () => setIsShow(false));

	return (
		<>
			<div className="grow md:hidden" />
			<div
				className={cls(
					"h-10 px-4 py-2 flex items-center gap-3 bg-trasparent transition-all cursor-pointer",
					"md:grow md:w-auto md:relative md:left-auto md:-translate-x-0 md:justify-start md:bg-gray-700 md:rounded-md md:hover:bg-gray-600 md:focus-within:bg-gray-600",
					isShow
						? "w-10/12 absolute left-2/4 -translate-x-2/4 z-10 justify-start bg-gray-700 rounded-md hover:bg-gray-600 focus-within:bg-gray-600"
						: "w-10 justify-center rounded-full hover:bg-gray-800"
				)}
				onClick={() => setIsShow(true)}
				ref={ref}
			>
				<FaSearch className="flex-none text-sm text-white select-none pointer-events-none" />
				<input
					className={cls(
						"w-full text-md bg-transparent text-white outline-none",
						isShow ? "block" : "hidden md:block"
					)}
					type="text"
					placeholder="Search"
				/>
			</div>
		</>
	);
}
