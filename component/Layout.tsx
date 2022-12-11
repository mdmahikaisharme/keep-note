import { ReactNode } from "react";
import { Header, Sidebar } from "@component";
import { useAppContext } from "@context/App";
import { cls } from "@util";

interface iLayoutProps {
	className?: string;
	children?: ReactNode;
}
export default function Layout({ className, children }: iLayoutProps) {
	const appContext = useAppContext();
	return (
		<>
			<Header />
			<section className="w-screen h-[100vh-3.5rem] flex bg-gray-900 ">
				<Sidebar />
				<div className={cls("grow", className as string)}>
					{children}
				</div>
			</section>
		</>
	);
}
