import { FaRecycle } from "react-icons/fa";
import { BtnRound } from "@component/Button";
import { iNote } from "@type/modal";
import { buildClientCookie } from "@util/token";
import api from "@api";

interface iNoteProps {
	note: iNote;
	onRemove: (noteId: string) => void;
	onClick: (note: iNote) => void;
}
export default function Note(props: iNoteProps) {
	const {
		note: {
			title,
			content: { text },
		},
		onRemove,
		onClick,
	} = props;
	const state = { isDeleted: false };

	const addToTrash = async () => {
		state.isDeleted = true;

		// request for remove note
		const cookies = await buildClientCookie();
		const request = await api.removeNote(cookies, props.note);

		onRemove(props.note._id);
	};

	return (
		<div
			className="w-full min-h-[8rem] px-4 py-2 relative flex flex-col gap-1 border-2 border-gray-800 rounded-md shadow-lg group hover:border-gray-700 focus-within:border-gray-700"
			onClick={() => (state.isDeleted ? null : onClick(props.note))}
		>
			{/* tilte */}
			<h2 className="text-base font-semibold text-gray-400">{title}</h2>
			{/* content */}
			<div className="w-f">
				{/* content text */}
				{text && <NoteContentText data={text} />}
			</div>
			{/* remove */}
			<div className="absolute top-2 right-4 hidden group-hover:block">
				<BtnRound
					icon={FaRecycle}
					size={8}
					textSize={"sm"}
					onClick={addToTrash}
				/>
			</div>
		</div>
	);
}

function NoteContentText({ data }: { data: string }) {
	return <div className="text-base text-gray-300">{data}</div>;
}
