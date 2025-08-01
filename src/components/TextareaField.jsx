import { useState } from "react";
import Textarea from "./ui/Textarea";
import { Asterisk } from "lucide-react";

function TextareaField({
	label,
	required = false,
	value,
	setValue,
	placeholder,
	error,
	disabled,
	rows,
}) {
	const [showError, setShowError] = useState(false);

	return (
		<div className="flex flex-col gap-y-3 w-full">
			<label className="flex gap-x-0.5">
				<span className="dark:text-white text-sm md:text-base font-semibold">
					{label}
				</span>
				{required && (
					<Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
				)}
			</label>
			<div className="flex flex-col gap-y-2">
				{required ? (
					<Textarea
						disabled={disabled}
						value={value}
						placeholder={placeholder}
						rows={rows}
						onChange={(e) => {
							setShowError(!e.target.value > 0);
							setValue(e.target.value);
						}}
					/>
				) : (
					<Textarea
						disabled={disabled}
						value={value}
						placeholder={placeholder}
						rows={rows}
						onChange={(e) => {
							setValue(e.target.value);
						}}
					/>
				)}
				{required && showError && (
					<div className="flex gap-x-1.5 text-red-500">
						<CircleAlert className="w-4 h-4" />
						<p className="text-sm">{error}</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default TextareaField;
