import { Mail } from "lucide-react";

export function EmptyInvitation({
    title = "No invitations found",
    message = "Try adjusting your search or filter criteria.",
}) {
    return (
        <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-2">
                <Mail className="h-12 w-12 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
                {message}
            </p>
        </div>
    );
} 