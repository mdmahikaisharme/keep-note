import { FaBell } from "react-icons/fa";
import { Layout, PageEmpty } from "@component";

export default function ReminderPage() {
	return (
		<Layout className="py-4">
			<PageEmpty icon={FaBell} describtion="No notes in Reminder" />
		</Layout>
	);
}
