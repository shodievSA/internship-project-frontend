function Input({ placeholder, value, disabled = false, onChange, className }) {
	return (
		<input
			disabled={disabled}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={`${className} dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
			focus:border-black/30 bg-white rounded-md text-sm border-[1px] py-2 px-4 outline-none 
			disabled:opacity-50 disabled:pointer-events-none cursor-text w-full`}
		/>
	);
}

export default Input;
