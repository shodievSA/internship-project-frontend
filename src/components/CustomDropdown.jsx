import { useState, useRef, useEffect } from "react";
import Button from "./ui/Button";
import { ChevronDown, Check, Filter } from "lucide-react";

export function CustomDropdown({
	value,
	onChange,
	options,
	placeholder,
	icon: Icon = Filter,
	className = "",
}) {

	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {

		function handleClickOutside(event) {

			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}

		}

		function handleEscape(event) {

			if (event.key === "Escape") {
				setIsOpen(false);
			}

		}

		if (isOpen) {

			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscape);

		}

		return () => {

			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);

		};

	}, [isOpen]);

	const selectedOption = options.find((option) => option.value === value);

	return (
		<div className={`relative w-full ${className}`} ref={dropdownRef}>
			<Button
				onClick={() => setIsOpen(!isOpen)}
				variant="secondary"
				size="md"
			>
				{/* Mobile Layout */}
				<div className="flex items-center justify-between w-full sm:hidden">
					<Icon className="h-4 w-4 text-gray-500 dark:text-neutral-400 flex-shrink-0" />
					<span className="flex-1 text-center mx-2">{selectedOption?.label || placeholder}</span>
					<ChevronDown className={`h-4 w-4 text-gray-500 dark:text-neutral-400 transition-transform 
					flex-shrink-0 ${isOpen ? "rotate-180" : "rotate-0"}`} />
				</div>

				{/* Desktop Layout */}
				<div className="hidden sm:flex items-center gap-2 w-full">
					<Icon className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
					<span>{selectedOption?.label || placeholder}</span>
					<ChevronDown className={`h-4 w-4 text-gray-500 dark:text-neutral-400 transition-transform 
					ml-auto ${isOpen ? "rotate-180" : "rotate-0"}`} />
				</div>
			</Button>
			{isOpen && (
				<div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-full min-w-[160px] bg-white 
				dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-md shadow-lg z-50">
					<div className="flex flex-col p-1.5 gap-y-1.5">
						{options.map((option) => (
							<button
								key={option.value}
								onClick={() => {
									onChange(option.value);
									setIsOpen(false);
								}}
								className={`flex justify-between items-center w-full text-left px-3 py-2 text-sm 
								hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors rounded-md
								${value === option.value ? "text-black dark:text-white bg-gray-100 dark:bg-neutral-900 font-medium" :
										"text-black dark:text-white"}`}
							>
								<span>{option.label}</span>
								{value === option.value && (
									<Check className="h-4 w-4 text-gray-900 dark:text-white" />
								)}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);

}
