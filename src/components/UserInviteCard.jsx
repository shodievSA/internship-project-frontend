import Button from "./ui/Button";
import { Calendar, Mail, User, Check, X, Pickaxe } from "lucide-react";
import { getDateFromIso } from "../utils/formatIsoDate";
import InviteStatusBadge from "./InviteStatusBadge";

function UserInviteCard({ invite, onRespond }) {

	return (
		<div className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 
		rounded-xl px-5 py-3 shadow-sm">
			<div className="flex flex-col sm:flex-row items-start justify-between">
				<div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 
				flex-1 w-full">
					<img
						src={invite.from.avatarUrl}
						alt={`${invite.from.fullName}'s avatar`}
						className="w-10 h-10 rounded-full flex-shrink-0 object-cover self-center"
					/>
					<div className="flex gap-y-2 flex-col justify-between flex-1 min-w-0 text-left w-full">
						<div className="flex justify-between">
							<div>
								<h3 className="text-lg text-gray-900 dark:text-white">
									<span className="font-semibold">Project: </span>{" "}
									{invite.project.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 md:mb-0 sm:mb-4 text-sm">
									Invited by{" "}
									<span className="font-medium text-gray-900 dark:text-white">
										{invite.from.fullName}
									</span>
								</p>
								<div className="flex justify-start sm:hidden mb-4">
									<InviteStatusBadge inviteStatus={invite.status} />
								</div>
							</div>
							<div>
								<div className="hidden sm:block flex-shrink-0 ml-4">
									<InviteStatusBadge inviteStatus={invite.status} />
								</div>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex md:gap-x-8 sm:gap-6 text-sm text-gray-600 dark:text-gray-400">
								<div className="flex items-center gap-2 justify-start">
									<Mail className="h-4 w-4 flex-shrink-0" />
									<span className="truncate">
										{invite.from.email}
									</span>
								</div>
								<div className="flex items-center gap-2 justify-start">
									<User className="h-4 w-4 flex-shrink-0" />
									<span>{invite.roleOffered}</span>
								</div>
								<div className="flex items-center gap-2">
									<Pickaxe className="h-4 w-4" />
									<span>{invite.positionOffered}</span>
								</div>
								<div className="flex items-center gap-2 justify-start">
									<Calendar className="h-4 w-4 flex-shrink-0" />
									<span>{getDateFromIso(invite.createdAt)}</span>
								</div>
							</div>
							{invite.status === "pending" && (
								<div className="flex flex-col sm:flex-row gap-5 justify-center 
								sm:justify-start sm:ml-16">
									<Button
										size="sm"
										onClick={() =>
											onRespond("accepted", invite.projectId, invite.id)
										}
									>
										<div className="flex items-center gap-x-2 px-1">
											<Check className="h-3.5 w-3.5" />
											Accept
										</div>
									</Button>
									<Button
										size="sm"
										onClick={() =>
											onRespond("rejected", invite.projectId, invite.id)
										}
									>
										<div className="flex items-center gap-x-2 px-1">
											<X className="h-3.5 w-3.5" />
											Reject
										</div>
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	
}

export default UserInviteCard;
