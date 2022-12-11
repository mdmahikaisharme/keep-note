import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface iHelpxProps {
	state: any;
	children: ReactNode;
}
export default function HelpX({ state, children }: iHelpxProps) {
	return (
		<AnimatePresence>
			{state && (
				<motion.div
					className="ml-2 text-xs text-red-400"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
