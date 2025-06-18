import { AlertTriangle } from "lucide-react"

export function RoleConfirmationDialog({ member, action, onConfirm, onCancel }) {
    const isPromotion = action === "promote"
    const title = isPromotion ? "Promote Team Member" : "Demote Team Member"
    const actionText = isPromotion ? "Promote" : "Demote"
    const newRole = isPromotion ? "Manager" : "Member"

    return (
        <div className="p-6 max-w-md w-full">
            <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-3">
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-300">
                Are you sure you want to {action} <span className="font-medium">{member.name}</span> to {newRole}?
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-md p-4 mb-6">
                <p className="text-yellow-600 dark:text-yellow-300 font-medium mb-2">This action will:</p>
                <ul className="list-disc pl-5 space-y-1 text-yellow-600 dark:text-yellow-300">
                    {isPromotion ? (
                        <>
                            <li>Grant them manager privileges</li>
                            <li>Allow them to manage team members</li>
                            <li>Give them access to project settings</li>
                        </>
                    ) : (
                        <>
                            <li>Remove their manager privileges</li>
                            <li>Restrict their access to project settings</li>
                            <li>Remove their ability to manage team members</li>
                        </>
                    )}
                </ul>
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 text-sm font-medium text-white dark:text-gray-900 bg-gray-900 dark:bg-white border border-transparent rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    {actionText}
                </button>
            </div>
        </div>
    )
} 