import { formatIsoDate } from "../utils/formatIsoDate";
import { Mail, User, Calendar, Pickaxe, Loader } from "lucide-react";
import userPlaceholder from "../assets/user-placeholder.png";

export function ProjectInvitationCard({ invite }) {

	function getStatusBadge(status) {

		switch (status) {
			case "pending":
				return (
					<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 
					text-yellow-800 dark:bg-yellow-600/20 dark:text-yellow-300">
						<div className="flex gap-x-2 items-center">
							<Loader className="w-4 h-4 animate-spin-slow" />
							<span>Pending</span>
						</div>
					</span>
				);
			case "accepted":
				return (
					<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 
					text-green-800 dark:bg-green-900/20 dark:text-green-300">
						Accepted
					</span>
				);
			case "rejected":
				return (
					<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 
					text-red-800 dark:bg-red-800/30 dark:text-red-400">
						Rejected
					</span>
				);
			default:
				return null;

		}

	}

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
							<span>{ invite.receiverEmail }</span>
						</div>
						<div className="flex items-center gap-2">
							<User className="h-4 w-4" />
							<span>{ invite.roleOffered }</span>
						</div>												
						<div className="flex items-center gap-2">
							<Pickaxe className="h-4 w-4" />
							<span>{ invite.positionOffered }</span>
						</div>													
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							<span>{ formatIsoDate(invite.createdAt) }</span>
						</div>
					</div>
				</div>
            </div>
            <div>
                { getStatusBadge(invite.status) }
            </div>
        </div>
    );

} 