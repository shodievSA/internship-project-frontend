import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { UserPlus, Inbox, ArrowLeft } from "lucide-react";

function EmptyProjectInvites({ openModal }) {

	const navigate = useNavigate();

	return (
		<div className="h-full flex flex-col gap-y-5 px-4 lg:px-6 pt-4">
			<div>
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
			</div>
			<div className="grow flex flex-col justify-center items-center gap-y-2">
				<Inbox className="w-16 h-16" />
				<div className="flex items-center flex-col gap-y-5 w-[380px]">
					<h1 className="text-xl text-center">
						No invites yet... but the party’s just getting started
					</h1>
					<Button
						size="md"
						className="flex items-center gap-x-3 w-max"
						onClick={openModal}
					>
						<UserPlus className="h-4 w-4" />
						<span>Send First Invite</span>
					</Button>
				</div>
			</div>
		</div>
	);
	
}

export default EmptyProjectInvites;
