import { CloudAlert, RotateCcw } from "lucide-react";
import Button from "./ui/Button";

function ErrorState({ message }) {
	function reloadPage() {
		location.reload();
	}

	return (
		<div className="h-full flex items-center justify-center">
			<div className="flex flex-col items-center gap-y-5 w-[500px]">
				<CloudAlert className="w-32 h-32" />
				<div className="flex flex-col items-center gap-y-5">
					<h1 className="text-2xl text-center leading-normal">
						{message}
					</h1>
					<Button size="lg" onClick={reloadPage}>
						<div className="flex items-center gap-x-2">
							<RotateCcw className="w-5 h-5" />
							<span className="text-lg font-medium">
								Try again
							</span>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ErrorState;
