import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Button from "./ui/Button";

function FilterDropdown({ icon: Icon, value, onChange, options, disabled }) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (option) => {
		onChange(option.value);
		setIsOpen(false);
	};

	const selectedOption =
		options.find((opt) => opt.value === value) || options[0];

	return (
		<div className="relative w-full lg:w-auto" ref={dropdownRef}>
			<Button
				variant="secondary"
				size="md"
				onClick={() => setIsOpen(!isOpen)}
				disabled={disabled}
				className={"w-full lg:w-auto"}
			>
				<div className="flex items-center gap-x-3 text-sm">
					<Icon className="w-4 h-4 flex-shrink-0" />
					<span className="flex-1 text-center lg:text-left truncate">
						{selectedOption.label}
					</span>
					<ChevronDown
						className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
					/>
				</div>
			</Button>

			{isOpen && (
				<div
					className="absolute top-full mt-1 w-full min-w-48 bg-white dark:bg-black left-1/2 -translate-x-1/2 
				border border-gray-300 dark:border-neutral-800 rounded-md shadow-lg z-50 p-1.5"
				>
					<div className="flex flex-col gap-y-1.5">
						{options.map((option) => (
							<button
								key={option.value}
								onClick={() => handleSelect(option)}
								className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors ${
									value === option.value
										? "text-black dark:text-white bg-gray-100 dark:bg-neutral-900 font-medium"
										: "text-black dark:text-white"
								} rounded-md`}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default FilterDropdown;
