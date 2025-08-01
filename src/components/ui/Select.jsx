import { useEffect, useState, useRef } from "react";
import { ChevronRight, Check } from "lucide-react";

function Select({
	selected,
	disabled,
	onChange,
	options,
	placeholder = "Select an option",
}) {
	const [showOptions, setShowOptions] = useState(false);

	const selectRef = useRef();

	useEffect(() => {
		document.addEventListener("mousedown", hideOptions);

		function hideOptions(e) {
			if (showOptions && !selectRef.current.contains(e.target)) {
				setShowOptions(false);
			}
		}

		return () => {
			document.removeEventListener("mousedown", hideOptions);
		};
	}, [showOptions]);

	return (
		<div ref={selectRef} className="relative">
			<button
				disabled={disabled}
				className="dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md text-sm 
                lg:text-base border-[1px] py-2 px-4 outline-none w-full disabled:opacity-50
                disabled:cursor-not-allowed cursor-pointer"
				onClick={() => setShowOptions(true)}
			>
				<div className="flex justify-between items-center">
					{selected ? selected.label : placeholder}
					<ChevronRight
						className={`${showOptions ? "-rotate-90" : "rotate-90"} 
                    h-4 w-4 transition-[all] duration-200`}
					/>
				</div>
			</button>
			<div
				className={`${showOptions ? "opacity-100" : "opacity-0 pointer-events-none"} 
            absolute z-10 flex flex-col dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
            focus:border-black bg-white rounded-md text-sm lg:text-base border-[1px] p-2 outline-none 
            w-full flex flex-col gap-y-1 items-center mt-2 transition-[opacity] duration-150`}
			>
				{options.map((option, index) => {
					return (
						<button
							key={index}
							type="button"
							className={`${
								selected?.value === option.value
									? "dark:bg-neutral-900 bg-neutral-100"
									: "bg-transparent"
							} dark:hover:bg-neutral-900 hover:bg-neutral-100 py-2 px-4 w-full 
                                rounded-md cursor-pointer flex justify-between items-center`}
							onClick={() => {
								onChange(option);
								setShowOptions(false);
							}}
						>
							<span>{option.label}</span>
							{selected?.value === option.value && (
								<Check className="w-4 h-4" />
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default Select;
