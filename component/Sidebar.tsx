import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { IconType } from "react-icons";
import {
	FaArchive,
	FaBell,
	FaEdit,
	FaLightbulb,
	FaRecycle,
} from "react-icons/fa";
import { useAppContext } from "@context/App";
import { useOutsideClick } from "@hook";
import { cls, styleMedia } from "@util";

export default function Sidebar() {
	const router = useRouter();
	const appContext = useAppContext();
	const ref = useRef({} as HTMLDivElement);

	useOutsideClick(
		[ref, appContext.sidebar.togglerRef],
		!appContext.sidebar.small,
		() => {
			window.innerWidth <= styleMedia.md &&
				appContext.dispatch({ type: "TOOGLE_SIDEBAR" });
		}
	);

	return (
		<div
			className={cls(
				"flex-none h-[calc(100vh-3.5rem)] py-2 sticky left-0 top-14 flex flex-col gap-1 transition-all overflow-hidden",
				appContext.sidebar.small ? "w-10" : "w-64"
			)}
			ref={ref}
		>
			<SidebarItem
				name="Notes"
				href={"/"}
				icon={FaLightbulb}
				active={router.pathname === "/"}
				show={appContext.sidebar.small}
			/>
			<SidebarItem
				name="Reminders"
				href={"/reminder"}
				icon={FaBell}
				active={router.pathname.startsWith("/reminder")}
				show={appContext.sidebar.small}
			/>
			<SidebarItem
				name="Edit labels"
				href={"/"}
				icon={FaEdit}
				active={router.pathname.startsWith("null")}
				show={appContext.sidebar.small}
			/>
			<SidebarItem
				name="Archive"
				href={"/archive"}
				icon={FaArchive}
				active={router.pathname.startsWith("/archive")}
				show={appContext.sidebar.small}
			/>
			<SidebarItem
				name="Trash"
				href={"/trash"}
				icon={FaRecycle}
				active={router.pathname.startsWith("/trash")}
				show={appContext.sidebar.small}
			/>
		</div>
	);
}

interface iSidebarItemProps {
	name: string;
	icon: IconType;
	href: string;
	active: boolean;
	show: boolean;
}
function SidebarItem(props: iSidebarItemProps) {
	const { name, icon, href, active, show } = props;
	const Icon = icon;

	return (
		<Link href={href}>
			<a
				className={cls(
					"flex items-center gap-4 rounded-tr-full rounded-br-full cursor-pointer select-none",
					show ? "" : "px-4",
					active ? "bg-orange-900" : "hover:bg-orange-800"
				)}
			>
				<div className="flex-none w-10 h-10 grid place-items-center">
					<Icon className="text-base text-gray-300" />
				</div>
				{!show && (
					<span className="text-sm font-bold text-gray-300">
						{name}
					</span>
				)}
			</a>
		</Link>
	);
}
