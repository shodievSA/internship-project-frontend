import { RefreshCcw } from "lucide-react";

function ProjectLoadingState({ message }) {

	return (
		<div className="h-full flex items-center justify-center">
			<div className="flex items-center gap-x-5">
				<RefreshCcw className="animate-spin w-8 h-8" />
				<span className="text-2xl">{ message }</span>
			</div>
		</div>
	)

}

export default ProjectLoadingState;