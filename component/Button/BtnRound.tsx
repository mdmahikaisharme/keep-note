import { ReactNode, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IconType } from "react-icons";
import { useOutsideClick } from "@hook";
import { cls } from "@util";
import style from "@style/Button/BtnRound.module.scss";

interface iBtnRound {
	text?: string;
	icon?: IconType;
	className?: string;
	size?: 8 | 10;
	height?: 8 | 10;
	color?: `gray-${300 | 400 | 700}` | "white";
	textSize?: "sm" | "base";
	onClick?: () => any;
	Ref?: any;
	children?: ReactNode;
}

export default function BtnRound(props: iBtnRound) {
	const {
		text,
		icon,
		className,
		size = 10,
		height,
		color = "gray-300",
		textSize = "base",
		onClick,
		Ref,
		children,
	} = props;
	const Icon = icon;
	const [isShow, setIsShow] = useState(false);
	const ref = {
		button: useRef({} as HTMLButtonElement),
		content: useRef({} as HTMLDivElement),
	};

	const textStyle = cls(
		style[`btnRoundTextSize-${textSize}`],
		style[`btnRoundTextColor-${color}`]
	);

	useOutsideClick([ref.button, ref.content], isShow, () => setIsShow(false));

	return (
		<div className="flex-none relative" ref={Ref}>
			<button
				className={cls(
					style.btnRound,
					height
						? style[`btnRoundHeight-${height}`]
						: style[`btnRoundSize-${size}`]
				)}
				onClick={() =>
					onClick ? onClick() : children && setIsShow(!isShow)
				}
				ref={ref.button}
			>
				{/* Icon */}
				{Icon && <Icon className={textStyle} />}
				{/* Text */}
				{text && <span className={textStyle}>{text}</span>}
			</button>

			{/* children */}
			{children && (
				<AnimatePresence>
					{isShow && (
						<div className={className} ref={ref.content}>
							{children}
						</div>
					)}
				</AnimatePresence>
			)}
		</div>
	);
}
