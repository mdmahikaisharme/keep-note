import Image from "next/image";
import { tIcon } from "@type/util";
import img from "@img";

interface iIconPicker {
	icon: tIcon;
	className?: string;
	optional?: tIcon;
}

export default function IconPicker(props: iIconPicker): JSX.Element {
	const { icon, className, optional } = props;
	const Icon = icon;

	return (
		<>
			{typeof icon === "string" && icon in img ? (
				<Image
					className={className}
					src={img[icon]}
					objectFit="contain"
				/>
			) : typeof Icon === "function" ? (
				<Icon className={className} />
			) : optional ? (
				IconPicker({ icon: optional, className })
			) : null}
		</>
	);
}
