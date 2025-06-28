import { Calendar, Mail, User, Check, X } from "lucide-react";
import { getAvatarUrl } from "../utils/constant";
import { getStatusBadge } from "../utils/uiUtils";

const NotificationCard = ({ invitation, onAccept, onReject }) => {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-1 w-full">
          {/* Avatar */}
          <img
            src={getAvatarUrl(invitation.inviterName)}
            alt={`${invitation.inviterName}'s avatar`}
            className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
          />

          <div className="flex-1 min-w-0 text-left w-full">
            {/* Project Name */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {invitation.projectName}
            </h3>

            {/* Inviter Information */}
            <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-4 text-sm">
              Invited by{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {invitation.inviterName}
              </span>
            </p>

            {/* Status Badge - Mobile Only */}
            <div className="flex justify-start sm:hidden mb-4">
              {getStatusBadge(invitation.status)}
            </div>

            {/* Info Row */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-2 justify-start">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{invitation.inviterEmail}</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <User className="h-4 w-4 flex-shrink-0" />
                <span>{invitation.role}</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{invitation.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge - Desktop Only */}
        <div className="hidden sm:block flex-shrink-0 ml-4">
          {getStatusBadge(invitation.status)}
        </div>
      </div>

      {/* Action Buttons */}
      {invitation.status === "pending" && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start sm:ml-16">
          <button
            onClick={() => onAccept(invitation.id)}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-black"
          >
            <Check className="h-4 w-4" />
            Accept
          </button>
          <button
            onClick={() => onReject(invitation.id)}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-transparent text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-black"
          >
            <X className="h-4 w-4" />
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export { NotificationCard };
