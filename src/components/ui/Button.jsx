function Button({
	variant = "primary",
	size = "lg",
	children,
	loading = false,
	disabled = false,
	onClick,
	className,
}) {
	const variants = {
		primary:
			"dark:bg-white dark:hover:bg-slate-200 dark:text-black bg-neutral-900 hover:bg-neutral-900/90 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none transition-[background-color] duration-200",
		secondary:
			"dark:bg-neutral-950 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900 bg-white hover:bg-slate-100 border-[1px] rounded-md disabled:opacity-50 disabled:pointer-events-none transition-[background-color] duration-200",
		destructive:
			"bg-red-900 hover:bg-red-950 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none transition-[background-color] duration-200",
		alert: "dark:bg-orange-800 bg-orange-600 dark:hover:bg-orange-900 hover:bg-orange-700 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none transition-[background-color] duration-200",
		signInPr: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
		signInSec: "bg-white text-purple-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
	};

	const sizes = {
		sm: "text-sm px-3 py-1.5",
		md: "text-base py-2 px-4 text-sm md:text-base",
		lg: "text-base py-3 px-6 text-sm md:text-base",
		lgW: "w-[16.8rem] h-[2.8rem] text-sm md:text-base lg:text-lg",
		xlW: "w-[22.5rem] h-[2.5rem] text-sm md:text-base lg:text-lg",
	};

	return (
		<button
			onClick={onClick}
			disabled={disabled || loading}
			className={`${variants[variant]} ${sizes[size]} ${className}`}
		>
			{loading ? (
				<div className="flex justify-center relative w-5 h-5 lg:w-full">
					<div className="absolute w-5 h-5 border-2 dark:border-gray-300 border-gray-400 rounded-full"></div>
					<div
						className="absolute w-5 h-5 border-2 border-transparent border-t-white 
                        dark:border-t-black rounded-full animate-spin"
					></div>
				</div>
			) : (
				children
			)}
		</button>
	);
}

export default Button;
