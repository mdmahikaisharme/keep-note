import { useRef } from "react";
import {
	FaArchive,
	FaBackward,
	FaBell,
	FaCheck,
	FaEllipsisV,
	FaForward,
	FaImage,
	FaPaintBrush,
	FaUserPlus,
} from "react-icons/fa";
import { BtnRound } from "@component/Button";
import { iNote } from "@type/modal";
import { buildClientCookie } from "@util/token";
import api from "@api";
import Overlay from "@component/Overlay";

interface iEditProps {
	state: boolean;
	note: iNote;
	onClose: () => void;
	onUpdate: (updatedNote: iNote) => void;
}

export default function Edit(props: iEditProps) {
	const {
		state,
		note: {
			title,
			content: { text },
		},
		onClose,
		onUpdate,
	} = props;
	const ref = {
		title: useRef({} as HTMLInputElement),
		text: useRef({} as HTMLTextAreaElement),
		edit: useRef({} as HTMLDivElement),
	};

	const closeEditing = () => {
		ref.edit.current.parentElement?.click();
		onClose();
	};
	const saveNote = async (e: any) => {
		e.preventDefault();

		const updatedNote = {
			...props.note,
			title: ref.title.current.value || "",
			content: {
				text: ref.text.current.value || "",
			},
		} as iNote;

		// request for create note
		const cookies = await buildClientCookie();
		const request = await api.editNote(cookies, updatedNote);

		// update note
		onUpdate(updatedNote);
		closeEditing();
	};

	return (
		<Overlay state={state} onClose={closeEditing}>
			<div
				className="w-[calc(100vw-6rem)] md:w-[calc(100vw-30rem)] px-4 py-2 bg-gray-900 border-2 border-gray-800 rounded-md shadow-lg hover:border-gray-700 focus-within:border-gray-700"
				ref={ref.edit}
			>
				<form className="flex flex-col gap-1" onSubmit={saveNote}>
					{/* head */}
					<div className="w-full flex items-center gap-4">
						<input
							className="grow font-bold bg-transparent text-gray-400 outline-none"
							type="text"
							defaultValue={title}
							placeholder="Title"
							ref={ref.title}
						/>
						<BtnRound icon={FaCheck} size={8} textSize={"sm"} />
					</div>
					{/* content */}
					<div className="w-full">
						{/* textarea */}
						<textarea
							className="w-full bg-transparent text-gray-300 outline-none scrollY"
							rows={3}
							placeholder="Take a note..."
							defaultValue={text}
							ref={ref.text}
						/>
					</div>
				</form>
				{/* option */}
				<div className="w-full flex items-center gap-1">
					<BtnRound
						icon={FaBell}
						size={8}
						textSize={"sm"}
						color={"gray-400"}
					/>
					<BtnRound
						icon={FaUserPlus}
						size={8}
						textSize={"sm"}
						color={"gray-400"}
					/>
					<BtnRound
						icon={FaPaintBrush}
						size={8}
						textSize={"sm"}
						color={"gray-400"}
					/>
					<BtnRound
						icon={FaImage}
						size={8}
						textSize={"sm"}
						color={"gray-400"}
					/>
					<BtnRound
						icon={FaArchive}
						size={8}
						textSize={"sm"}
						color={"gray-400"}
					/>
					<BtnRound
						icon={FaEllipsisV}
						size={8}
						textSize={"sm"}
						color={"gray-400"}
					/>
					<BtnRound
						icon={FaBackward}
						size={8}
						textSize={"sm"}
						color={"gray-700"}
					/>
					<BtnRound
						icon={FaForward}
						size={8}
						textSize={"sm"}
						color={"gray-700"}
					/>
					<div className="grow"></div>

					<div className="flex-none relative">
						<BtnRound
							text={"Close"}
							height={8}
							textSize={"sm"}
							color={"gray-400"}
							onClick={closeEditing}
						/>
					</div>
				</div>
			</div>
		</Overlay>
	);
}
