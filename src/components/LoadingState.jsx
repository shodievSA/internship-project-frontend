import { RefreshCcw } from "lucide-react";

function LoadingState({ message }) {

	return (
		<div className="h-full flex items-center justify-center">
			<div className="flex items-center gap-x-3">
				<RefreshCcw className="animate-spin w-6 h-6" />
				<span className="text-xl">{ message }</span>
			</div>
		</div>
	)

}

export default LoadingState;