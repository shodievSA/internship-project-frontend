import { Mail } from "lucide-react";

export function EmptyInvitation() {

    return (
		<div className="h-full flex items-center justify-center">
			<div className="text-center py-12">
				<div className="text-gray-400 dark:text-gray-500 mb-2">
					<Mail className="h-12 w-12 mx-auto mb-4" />
				</div>
				<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
					You're all caught up!
				</h3>
				<p className="text-gray-600 dark:text-gray-400">
					All your project invites will appear here
				</p>
			</div>
		</div>
    );

} 