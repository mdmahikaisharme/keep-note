import Link from "next/link";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { BtnRound } from "@component/Button";
import { useAppContext } from "@context/App";

export default function User() {
	const appContext = useAppContext();

	return (
		<BtnRound icon={FaUser} color="white">
			<motion.div
				className={`w-[300px] px-4 py-4 absolute top-[calc(100%+1rem)] right-0 flex flex-col gap-2 bg-gray-900 border-2 border-gray-800 rounded-md shadow-md scrollY`}
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -10, opacity: 0 }}
			>
				<div className="flex flex-col items-center justify-center">
					<div className="hover:border-gray-700 grid w-32 h-32 overflow-hidden border-2 border-gray-800 rounded-full">
						<p className="text-4xl font-semibold justify-self-center self-center text-gray-300">
							{appContext.user?.name[0]}
						</p>
					</div>
					<h2 className="mt-4 text-2xl font-semibold text-gray-300">
						{appContext.user?.name}
					</h2>

					<p className="mt-1 text-sm text-gray-500">
						Your are a logged in user.
					</p>
				</div>

				<div className="grow flex items-center justify-center gap-4 pt-4">
					<Link href={"/auth/logout"}>
						<a className="h-10 px-6 text-sm font-semibold flex items-center bg-blue-500 border-2 border-blue-500 text-white rounded-md hover:bg-transparent hover:text-blue-400 ">
							Logout
						</a>
					</Link>
				</div>
			</motion.div>
		</BtnRound>
	);
}
