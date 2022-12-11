import { FaBackward, FaRecycle } from "react-icons/fa";
import { BtnRound } from "@component/Button";
import { iTrash } from "@type/modal";
import { buildClientCookie } from "@util/token";
import api from "@api";

interface iTrashProps {
	trash: iTrash;
	onRemove: (trashId: string) => void;
}

export default function Trash(props: iTrashProps) {
	const {
		trash: { _id, title, content },
		onRemove,
	} = props;

	const removeFromTrash = async () => {
		// request for remove trash
		const cookies = await buildClientCookie();
		const request = await api.removeTrash(cookies, props.trash);

		// remove from trash
		onRemove(_id);
	};
	const restoreFromTrash = async () => {
		// request for restore trash
		const cookies = await buildClientCookie();
		const request = await api.restoreTrash(cookies, props.trash);

		// restore from trash
		onRemove(_id);
	};

	return (
		<div className="w-full min-h-[8rem] px-4 py-2 relative flex flex-col gap-1 border-2 border-gray-800 rounded-md shadow-lg group hover:border-gray-700 focus-within:border-gray-700">
			{/* tilte */}
			<h2 className="text-base font-semibold text-gray-400">{title}</h2>
			{/* content */}
			<div className="w-f">
				{/* content text */}
				{content.text && <TrashContentText data={content.text} />}
			</div>
			{/* option */}
			<div className="absolute top-2 right-4 items-center gap-2 hidden group-hover:flex">
				<BtnRound
					icon={FaBackward}
					size={8}
					textSize={"sm"}
					onClick={restoreFromTrash}
				/>
				<BtnRound
					icon={FaRecycle}
					size={8}
					textSize={"sm"}
					onClick={removeFromTrash}
				/>
			</div>
		</div>
	);
}

function TrashContentText({ data }: { data: string }) {
	return <div className="text-base text-gray-300">{data}</div>;
}
