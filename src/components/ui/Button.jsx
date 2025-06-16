function Button({
    variant = "primary",
    children,
    loading = false,
    disabled,
    onClick
}) {

    const variants = {
        primary: 'dark:bg-white dark:hover:bg-slate-200 dark:text-black bg-neutral-900 hover:bg-neutral-900/90 text-white py-2.5 px-4 rounded-lg font-medium text-sm lg:text-base flex justify-center disabled:opacity-50',
        secondary: 'dark:bg-neutral-950 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800 bg-white hover:bg-slate-100 py-2.5 px-4 border-[1px] rounded-lg font-medium text-sm lg:text-base disabled:opacity-50'
    }

    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`${variants[variant]}`}>
            {
                loading ? (
                    <div className="flex justify-center relative w-5 h-5">
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