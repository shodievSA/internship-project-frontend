import { Loader } from "lucide-react";

function InviteStatusBadge({ inviteStatus }) {

	switch (inviteStatus) {
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

export default InviteStatusBadge;