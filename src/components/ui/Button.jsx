function Button({
    variant = "primary",
	size="lg",
    children,
    loading = false,
    disabled = false,
    onClick,
    className
}) {

    const variants = {
        primary: 'dark:bg-white dark:hover:bg-slate-200 dark:text-black bg-neutral-900 hover:bg-neutral-900/90 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none transition-[background-color] duration-200',
        secondary: 'dark:bg-neutral-950 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900 bg-white hover:bg-slate-100 border-[1px] rounded-md disabled:opacity-50 disabled:pointer-events-none transition-[background-color] duration-200',
		destructive: 'bg-red-900 hover:bg-red-950 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none transition-[background-color] duration-200',
		alert: 'dark:bg-orange-800 bg-orange-600 dark:hover:bg-orange-900 hover:bg-orange-700 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none transition-[background-color] duration-200'
    };

	const sizes = {
		sm: 'text-sm px-3 py-2',
		md: 'text-base py-2 px-4 text-sm md:text-base',
		lg: 'text-base py-3 px-6 text-sm md:text-base'
	}

    return (
        <button 
            onClick={onClick}
            disabled={disabled || loading}
            className={`${variants[variant]} ${sizes[size]} ${className}`}>
            {
                loading ? (
                    <div className="flex justify-center relative w-5 h-5 w-full">
                        <div className="absolute w-5 h-5 border-2 dark:border-gray-300 border-gray-400 rounded-full"></div>
                        <div className="absolute w-5 h-5 border-2 border-transparent border-t-white 
                        dark:border-t-black rounded-full animate-spin"></div>
                    </div>
                ) : (
                    children
                )
            }
        </button>
    );

}

export default Button;