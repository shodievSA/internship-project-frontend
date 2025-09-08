import { formatIsoDate } from "../utils/formatIsoDate";
import { Mail, User, Calendar, Pickaxe, Loader } from "lucide-react";
import userPlaceholder from "../assets/user-placeholder.png";
import InviteStatusBadge from "./InviteStatusBadge";

export function ProjectInvitationCard({ invite }) {

	return (
		<div className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 
		rounded-lg px-5 py-5 shadow-sm hover:shadow-md transition-shadow relative flex items-center
		justify-between">
			<div className="flex items-center w-full gap-x-5">
				<img
					src={invite.receiverAvatarUrl ?? userPlaceholder}
					alt={invite.receiverName}
					className="w-12 h-12 rounded-full bg-gray-100 dark:bg-neutral-900 object-cover 
					flex-shrink-0"
				/>
				<div className="flex flex-col">
					<span className="font-semibold">{invite.receiverName}</span>
					<div className="flex gap-x-6 text-gray-600 dark:text-neutral-400">
						<div className="flex items-center gap-2">
							<Mail className="h-4 w-4" />
							<span>{invite.receiverEmail}</span>
						</div>
						<div className="flex items-center gap-2">
							<User className="h-4 w-4" />
							<span>{invite.roleOffered}</span>
						</div>
						<div className="flex items-center gap-2">
							<Pickaxe className="h-4 w-4" />
							<span>{invite.positionOffered}</span>
						</div>
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							<span>{formatIsoDate(invite.createdAt)}</span>
						</div>
					</div>
				</div>
			</div>
			<div>
				<InviteStatusBadge inviteStatus={invite.status} />
			</div>
		</div>
	);

}
