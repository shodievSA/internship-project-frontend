import { useRef } from "react";
import { Asterisk, Calendar } from "lucide-react";

function DatePicker({ disabled, onChange }) {

	const dateInput = useRef();

	return (
		<div className="flex flex-col gap-y-2">                                    
			<label className="flex gap-x-0.5">
				<span className="text-sm md:text-base font-semibold">Deadline</span>
				<Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
			</label>                                           
			<div className="relative">
				<input 
					disabled={disabled}
					ref={dateInput}
					type='date' 
					className="dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md 
					text-sm lg:text-base border-[1px] py-2 px-4 outline-none pl-10 w-full
					disabled:opacity-50 disabled:cursor-none cursor-text"
					onChange={onChange}
				/>
				<Calendar 
					onClick={() => dateInput.current.showPicker()} 
					className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2
					disabled:opacity-50 opacity-100 cursor-pointer`}
				/>
			</div>
		</div>           
	);

}

export default DatePicker;

