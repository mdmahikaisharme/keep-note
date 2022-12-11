import { Layout, PageEmpty } from "@component";
import {} from "@component/note";
import { FaArchive } from "react-icons/fa";

export default function ArchivePage() {
	return (
		<Layout className="py-4">
			<PageEmpty icon={FaArchive} describtion="No notes in Trash" />
		</Layout>
	);
}
