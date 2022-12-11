import { useRef, useState } from "react";
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
import { useAppContext } from "@context/App";
import { useOutsideClick } from "@hook";
import { iNote } from "@type/modal";
import api from "@api";
import { buildClientCookie, getClientToken } from "@util/token";

interface iCreateFormProps {
	show: boolean;
	onCreate: (newNote: iNote) => void;
	onClose: () => void;
}
export default function CreateForm(props: iCreateFormProps) {
	const { show, onCreate, onClose } = props;
	const [isShown, setIsShown] = useState(false);
	const ref = {
		title: useRef({} as HTMLInputElement),
		text: useRef({} as HTMLTextAreaElement),
		component: useRef({} as HTMLDivElement),
	};

	const closeForm = () => {
		if (!isShown) return setIsShown(true);

		setIsShown(false);
		onClose();
	};
	const onFormSubmit = async (e: any) => {
		e.preventDefault();

		const data = {
			title: ref.title.current.value,
			content: {
				text: ref.text.current.value,
			},
		} as iNote;

		// request for create note
		const cookies = await buildClientCookie();
		const request = await api.createNote(cookies, data);

		// add note
		onCreate(request.data.note);
		closeForm();
	};

	useOutsideClick([ref.component], show, closeForm);

	return show ? (
		<div
			className="w-full px-4 py-2 border-2 border-gray-800 rounded-md shadow-lg hover:border-gray-700 focus-within:border-gray-700"
			ref={ref.component}
		>
			<form className="flex flex-col gap-1" onSubmit={onFormSubmit}>
				{/* head */}
				<div className="w-full flex items-center gap-4">
					<input
						className="grow font-bold bg-transparent text-gray-400 outline-none"
						type="text"
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
						onClick={closeForm}
					/>
				</div>
			</div>
		</div>
	) : null;
}
