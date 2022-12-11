import { FaCheck, FaEdit, FaImage } from "react-icons/fa";
import { BtnRound } from "@component/Button";

interface iCreateFaceProps {
	onOpen: () => any;
}
export default function CreateFace(props: iCreateFaceProps) {
	const { onOpen } = props;

	return (
		<div
			className="w-full px-4 py-1 flex items-center gap-2 border-2 border-gray-800 rounded-md shadow-lg cursor-pointer hover:border-gray-700 active:bg-gray-800"
			onClick={onOpen}
		>
			<span className="grow text-left text-gray-400 select-none">
				Take a note...
			</span>

			<BtnRound icon={FaCheck} size={8} />
			<BtnRound icon={FaEdit} size={8} />
			<BtnRound icon={FaImage} size={8} />
		</div>
	);
}
