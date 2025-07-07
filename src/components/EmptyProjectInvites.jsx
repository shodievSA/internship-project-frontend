import { UserPlus, Inbox } from "lucide-react";
import Button from "./ui/Button";

function EmptyProjectInvites({ openModal }) {

	return (
		<div className="h-full flex flex-col gap-y-5 justify-center items-center">
			<Inbox className="w-16 h-16" />
			<div className="flex items-center flex-col gap-y-5">
				<h1 className="text-xl">
					No invites yet... but the party’s just getting started
				</h1>
				<Button
					size="lg"
					className="flex items-center gap-x-3 w-max"
					onClick={openModal}
				>
					<UserPlus className="h-5 w-5" />
					<span className="font-medium text-lg">Send Your First Invite</span>
				</Button>
			</div>
		</div>
	);

}

export default EmptyProjectInvites;