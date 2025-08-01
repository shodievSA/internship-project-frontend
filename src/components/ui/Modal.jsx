import { X } from "lucide-react";

function Modal({
	title,
	titleIcon,
	subtitle,
	size,
	children,
	closeModal,
	showOverlay = true,
	customWidth,
	customHeader,
}) {
	const sizes = {
		sm: "w-[350px]",
		md: "w-[350px] md:w-[500px]",
		lg: "w-[350px] md:w-[500px] lg:w-[750px] lg:max-h-[675px]",
	};

	function handleClick(e) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}

	// Determine overlay class based on showOverlay value
	const getOverlayClass = () => {
		if (showOverlay === false) return "";
		if (showOverlay === "light") return "bg-black/30";
		if (showOverlay === "medium") return "bg-black/50";
		return "bg-black/80"; // default dark overlay
	};

	// Use custom width if provided, otherwise use predefined sizes
	const widthClass = customWidth ? `w-[${customWidth}px]` : sizes[size];

	return (
		<div
			className={`flex items-center justify-center fixed h-full w-full 
			left-0 top-0 z-20 cursor-pointer ${getOverlayClass()}`}
			onClick={handleClick}
		>
			<div
				className={`dark:bg-neutral-950 dark:border-neutral-800 bg-white border-neutral-200 
		border-[1px] flex flex-col ${widthClass} rounded-lg cursor-default shadow-lg dark:text-white`}
			>
				<div className="p-5 flex flex-col gap-y-2">
					{customHeader ? (
						<div className="flex justify-between items-start gap-x-2">
							{customHeader}
							<button
								onClick={(e) => {
									e.stopPropagation();
									console.log("Close button clicked");
									closeModal();
								}}
								className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-neutral-900 flex-shrink-0"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
					) : (
						<>
							<div className="flex justify-between items-center gap-x-2">
								<div className="flex items-center gap-x-2">
									{titleIcon && titleIcon}
									<h1 className="text-base md:text-xl font-semibold">
										{title}
									</h1>
								</div>
								<button
									onClick={(e) => {
										e.stopPropagation();
										console.log("Close button clicked");
										closeModal();
									}}
									className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-neutral-900"
								>
									<X className="w-5 h-5" />
								</button>
							</div>
							{subtitle && (
								<h3 className="dark:text-neutral-400 text-slate-500 text-pretty">
									{subtitle}
								</h3>
							)}
						</>
					)}
				</div>
				{children}
			</div>
		</div>
	);
}

export default Modal;
