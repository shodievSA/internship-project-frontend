import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { Inbox, ArrowLeft, Plus } from "lucide-react";

function EmptySprint({ setShowNewTaskModal }) {

	const navigate = useNavigate();

	return (
		<div className="h-full flex flex-col gap-y-5 px-4 lg:px-6 pt-4">
			<div className="flex justify-between">
				<Button 
					variant="secondary"
					size="sm"
					onClick={() => navigate(-1)}
				>
					<div className="flex items-center gap-x-3">
						<ArrowLeft className="w-4 h-4" />
						<span>Back to project</span>
					</div>
				</Button>
				<Button
					size="sm"
					onClick={() => setShowNewTaskModal(true)}
				>
					<div className="flex items-center gap-x-2">
						<Plus className="w-4 h-4" />
						<span>New Ticket</span>
					</div>
				</Button>
			</div>
			<div className="grow flex flex-col justify-center items-center gap-y-2">
				<Inbox className="w-16 h-16" />
				<div className="flex items-center flex-col gap-y-5">
					<h1 className="text-xl">
						This sprint doesn't have any tasks yet!
					</h1>
				</div>
			</div>
		</div>
	);

}

export default EmptySprint;