import { useState } from "react";
import aiService from "../services/aiService";
import { useToast } from "./ui/ToastProvider";
import Input from "./ui/Input";
import { Asterisk, Sparkles, CircleAlert, Undo2 } from "lucide-react";
import Button from "./ui/Button";

function TaskTitleField({ 
	taskDescription, 
	value, 
	setValue, 
	disabled 
}) {

	const { showToast } = useToast();

	const [showError, setShowError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [generatedWithAi, setGeneratedWithAi] = useState(false);
	const [previousTaskTitle, setPreviousTaskTitle] = useState(() => value);

	async function generateTitle() {

		setLoading(true);
		setPreviousTaskTitle(value);

		try {

			const { generatedTaskTitle } = await aiService.generateTaskTitle(taskDescription);

			setGeneratedWithAi(true);
			setValue(generatedTaskTitle);

		} catch (err) {

			showToast({ 
				variant: "error", 
				title: err.message 
			});

		} finally {

			setLoading(false);

		}

	}

	function undoAiChanges() {

		setValue(previousTaskTitle);
		setGeneratedWithAi(false);
		
	}

	return (
		<div className="flex flex-col gap-y-3 w-full">
			<div className="flex justify-between items-center">
				<label className="flex gap-x-0.5">
					<span className="dark:text-white text-sm md:text-base font-semibold">
						Task Title
					</span>
					<Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
				</label>
				{generatedWithAi ? (
					<Button size="sm" onClick={undoAiChanges}>
						<div className="flex items-center gap-x-2">
							<Undo2 className="w-4 h-4" />
							<span>Undo</span>
						</div>
					</Button>
				) : (
					<div className="relative group inline-block">
						<button
							disabled={
								disabled ||
								taskDescription.trim().split(/\s+/).length < 20
							}
							className={`dark:bg-neutral-950 dark:border-neutral-800 dark:hover:bg-neutral-900 
								hover:bg-slate-100 border-[1px] py-2 md:px-3 md:py-2 rounded-md flex justify-center 
								items-center gap-x-3 w-36 md:w-40 ${disabled ? "cursor-not-allowed" : "cursor-pointer"} 
								disabled:opacity-50 peer`}
							onClick={generateTitle}
						>
							{loading ? (
								<div className="flex justify-center relative w-5 h-5">
									<div
										className="absolute w-5 h-5 border-2 dark:border-gray-300 
											border-gray-400 rounded-full"
									></div>
									<div
										className="absolute w-5 h-5 border-2 border-transparent border-t-white 
											dark:border-t-black rounded-full animate-spin"
									></div>
								</div>
							) : (
								<>
									<Sparkles className="w-4 h-4 text-purple-500" />
									<span className="text-xs md:text-sm font-medium">
										Generate Title
									</span>
								</>
							)}
						</button>
						<div
							className="dark:bg-neutral-950 dark:border-neutral-800 bg-white border-[1px] py-1 px-2 
							rounded-md absolute text-xs group-hover:peer-disabled:opacity-100 opacity-0 transition-[opacity] 
							duration-200 pointer-events-none cursor-none mt-2 w-44 text-center left-1/2 -translate-x-1/2"
						>
							Description must be at least 20 words
						</div>
					</div>
				)}
			</div>
			<Input
				placeholder={"Enter a clear and concise task title"}
				value={value}
				onChange={(e) => {
					const value = e.target.value;
					setShowError(!value);
					setValue(value);
				}}
				disabled={disabled}
			/>
			{showError && (
				<div className="flex gap-x-1.5 text-red-500">
					<CircleAlert className="w-4 h-4" />
					<p className="text-sm">Task title can't be empty</p>
				</div>
			)}
		</div>
	);
}

export default TaskTitleField;
