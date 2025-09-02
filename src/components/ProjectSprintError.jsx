import { useNavigate } from "react-router-dom";
import { CloudAlert, RotateCcw, ArrowLeft } from "lucide-react";
import Button from "./ui/Button";

function ProjectSprintError({ message }) {
    const navigate = useNavigate();

	function reloadPage() {
        location.reload();
	}

	return (
		<div className="h-full flex items-center justify-center relative">
			<div className="absolute top-[1.325rem] left-6">
				<Button
					size="sm"
					variant="secondary"
					onClick={ () => navigate(-1) }
				>
					<div className="flex items-center gap-x-2">
						<ArrowLeft className="w-4 h-4" />
						<span>Back to project</span>
					</div>
				</Button>
			</div>
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

export default ProjectSprintError;
