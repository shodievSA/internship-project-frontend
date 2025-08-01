function Textarea({ disabled, value, placeholder, rows, onChange }) {
	return (
		<textarea
			disabled={disabled}
			value={value}
			placeholder={placeholder}
			rows={rows}
			className={`dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
			focus:border-black/30 bg-white resize-none rounded-md text-sm border-[1px] w-full 
			py-2.5 px-4 outline-none disabled:opacity-50 disabled:cursor-default cursor-text
			scrollbar-thin dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800`}
			onChange={onChange}
		/>
	);
}

export default Textarea;
