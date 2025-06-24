import { Mail, User, Calendar, Pickaxe } from "lucide-react";

export function ProjectInvitationCard({ invitation, getAvatarUrl }) {

	function getStatusBadge(status) {

		switch (status) {
			case "pending":
				return (
					<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 
					text-yellow-800 dark:bg-yellow-600/20 dark:text-yellow-300">
						Pending
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
					text-red-800 dark:bg-red-900/20 dark:text-red-300">
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
					src={getAvatarUrl(invitation.inviterName)}
					alt={invitation.inviterName}
					className="w-12 h-12 rounded-full bg-gray-100 dark:bg-neutral-900 object-cover 
					flex-shrink-0"
				/>
				<div className="flex flex-col">
					<span className="font-semibold">John Doe</span>
					<div className="flex gap-x-6 text-gray-600 dark:text-neutral-400">
						<div className="flex items-center gap-2">
							<Mail className="h-4 w-4" />
							<span>{ invitation.inviterEmail }</span>
						</div>
						<div className="flex items-center gap-2">
							<User className="h-4 w-4" />
							<span>{ invitation.role }</span>
						</div>												
						<div className="flex items-center gap-2">
							<Pickaxe className="h-4 w-4" />
							<span>{ invitation.position }</span>
						</div>													
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							<span>{ invitation.date }</span>
						</div>
					</div>
				</div>
            </div>
            <div>
                { getStatusBadge(invitation.status) }
            </div>
        </div>
    );

} 