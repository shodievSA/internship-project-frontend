import { useNavigate } from "react-router-dom";
import { CloudAlert, ArrowLeft } from "lucide-react";
import Button from "./ui/Button";

function ProjectSprintError({ message }) {
    const navigate = useNavigate();

	function backToProject() {
        navigate(-1);
	}

	return (
		<div className="h-full flex items-center justify-center">
			<div className="flex flex-col items-center gap-y-5 w-[500px]">
				<CloudAlert className="w-32 h-32" />
				<div className="flex flex-col items-center gap-y-5">
					<h1 className="text-2xl text-center leading-normal">
						{message}
					</h1>
					<Button size="lg" onClick={backToProject}>
						<div className="flex items-center gap-x-2">
							<ArrowLeft className="w-5 h-5" />
							<span className="text-lg font-medium">
								Back to Project
							</span>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ProjectSprintError;
