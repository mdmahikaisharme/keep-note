import { IconType } from "react-icons";

interface iPageEmptyProps {
	notice?: string;
	icon: IconType;
	describtion: string;
}

export default function PageEmpty(props: iPageEmptyProps) {
	const { notice, icon, describtion } = props;
	const Icon = icon;

	return (
		<div className="h-full relative">
			<h2 className="text-center text-sm font-bold text-gray-400">
				{notice}
			</h2>

			<div className="text-center absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col items-center gap-4">
				{Icon && <Icon className="text-6xl text-gray-800" />}
				<h2 className="font-bold text-gray-700">{describtion}</h2>
			</div>
		</div>
	);
}
