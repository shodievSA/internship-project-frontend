import { useState, useRef } from "react";
import { Plus, X } from "lucide-react";

function SubtaskInput({ disabled, subtasks, setSubtasks }) {

	const [subtask, setSubtask] = useState(null);

	const subtaskInputRef = useRef();

	function addSubtask() {

        if (subtask?.title.length > 0) {

            setSubtasks([ ...subtasks, { ...subtask, id: subtasks.length + 1 } ]);
            subtaskInputRef.current.value = "";
            setSubtask(null);

        }

    }

	return (
		<div className="flex flex-col gap-y-5">
			<div className="flex flex-col gap-y-3">
				<label className="text-sm md:text-base flex gap-x-0.5 font-semibold">
					Subtasks (optional)
				</label>
				<div className="flex gap-x-3">
					<input 
						disabled={disabled}
						ref={subtaskInputRef}
						placeholder="Enter a subtask..." 
						className="dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
						focus:border-black bg-white rounded-md text-sm lg:text-base border-[1px] py-2 px-4 
						outline-none grow disabled:opacity-50 disabled:cursor-none"
						onChange={(e) => setSubtask({ title: e.target.value })}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								addSubtask();
							}
						}}
					/>
					<button 
						disabled={disabled}
						className="dark:bg-white dark:hover:bg-slate-200 p-2.5 rounded-md bg-neutral-900 
						hover:bg-neutral-900/90 disabled:opacity-50 disabled:cursor-none"
						onClick={addSubtask}
					>
						<Plus className="dark:text-black text-white w-5 h-5" />
					</button>
				</div>
			</div>
			{
				subtasks.length > 0 && (
					<div className="flex flex-col gap-y-2 rounded-md">
						<span className="text-sm md:text-base">Subtasks ({ subtasks.length }):</span>
						<div className="dark:border-neutral-800 border-[1px] flex flex-col gap-y-3 p-2.5 rounded-md">
							{
								subtasks.map((subtask) => {
									return (
										<div key={subtask.id} className="dark:bg-neutral-900 bg-neutral-200 py-1.5 px-3 flex 
										justify-between items-center rounded-md">
											<span className="text-sm md:text-base">{ subtask.title }</span>
											<button 
												className="p-2 rounded-full hover:bg-red-900 cursor-pointer transition-[background-color] 
												duration-200"
												onClick={() => setSubtasks(() => subtasks.filter((oldSubtask) => oldSubtask.id !== subtask.id ))}
											>
												<X className="w-4 h-4" />
											</button>
										</div>
									)
								})
							}
						</div>
					</div>
				)
			}    
		</div>                                
	);

}

export default SubtaskInput;