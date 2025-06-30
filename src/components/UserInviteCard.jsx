import Button from "./ui/Button";
import { getStatusBadge } from "../utils/uiUtils";
import { Calendar, Mail, User, Check, X, Pickaxe } from "lucide-react";

function UserInviteCard({ invite, onRespond }) {

	return (
		<div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 
		rounded-lg px-6 py-4 shadow-sm hover:shadow-md transition-shadow">
			<div className="flex flex-col sm:flex-row items-start justify-between">
				<div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 
				flex-1 w-full">
					<img
						src={invite.from.avatarUrl}
						alt={`${invite.from.fullName}'s avatar`}
						className="w-12 h-12 rounded-full flex-shrink-0 object-cover self-center"
					/>
					<div className="flex-1 min-w-0 text-left w-full">
						<h3 className="text-lg text-gray-900 dark:text-white mb-1">
							<span className="font-semibold">Project: </span> {invite.project.title}
						</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-4 text-sm">
							Invited by{" "}
							<span className="font-medium text-gray-900 dark:text-white">
								{invite.from.fullName}
							</span>
						</p>
						<div className="flex justify-start sm:hidden mb-4">
							{ getStatusBadge(invite.status) }
						</div>
						<div className="flex md:gap-x-8 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
							<div className="flex items-center gap-2 justify-start">
								<Mail className="h-4 w-4 flex-shrink-0" />
								<span className="truncate">{invite.from.email}</span>
							</div>
							<div className="flex items-center gap-2 justify-start">
								<User className="h-4 w-4 flex-shrink-0" />
								<span>{invite.roleOffered}</span>
							</div>
							<div className="flex items-center gap-2">
								<Pickaxe className="h-4 w-4" />
								<span>{ invite.positionOffered }</span>
							</div>
							<div className="flex items-center gap-2 justify-start">
								<Calendar className="h-4 w-4 flex-shrink-0" />
								<span>{invite.createdAt.split('T')[0]}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="hidden sm:block flex-shrink-0 ml-4">
					{ getStatusBadge(invite.status) }
				</div>
			</div>
			{
				invite.status === "pending" && (
					<div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start sm:ml-16">
						<Button
							size="sm"
							onClick={() => onRespond("accepted", invite.projectId, invite.id)}
						>
							<div className="flex items-center gap-x-2">
								<Check className="h-4 w-4" />
								Accept
							</div>
						</Button>
						<Button
							size="sm"
							onClick={() => onRespond("rejected", invite.projectId, invite.id)}
						>
							<div className="flex items-center gap-x-2">
								<X className="h-4 w-4" />
								Reject
							</div>
						</Button>
					</div>
				)
			}
		</div>
	);

};

export default UserInviteCard;
