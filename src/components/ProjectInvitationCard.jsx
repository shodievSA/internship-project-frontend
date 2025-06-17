import { Mail, User, Calendar } from "lucide-react";

export function ProjectInvitationCard({ invitation, getAvatarUrl }) {
    return (
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                    <img
                        src={getAvatarUrl(invitation.inviterName)}
                        alt={invitation.inviterName}
                        className="w-12 h-12 rounded-full bg-gray-100 dark:bg-neutral-900 object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                            {invitation.projectName}
                        </h3>
                        {/* Info Row */}
                        <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-neutral-400 mb-6">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>{invitation.inviterEmail}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{invitation.role}</span>
                            </div>
                            {invitation.status === "accepted" && invitation.position && (
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">Invited as:</span>
                                    <span>{invitation.position}</span>
                                </div>
                            )}
                            {invitation.status === "accepted" && invitation.extraRole && (
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Extra Role:</span>
                                    <span>{invitation.extraRole}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{invitation.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Status Badge */}
                <div className="flex-shrink-0">
                    {/* Status badge logic should be passed in or duplicated here if needed */}
                </div>
            </div>
        </div>
    );
} 