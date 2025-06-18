import { AlertTriangle } from "lucide-react"

export function ConfirmationDialog({ member, onConfirm, onCancel }) {
    return (
        <div className="p-6 max-w-md w-full">
            <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-3">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Remove Team Member</h3>
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-300">
                Are you sure you want to remove <span className="font-medium">{member.name}</span> from this project?
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-md p-4 mb-6">
                <p className="text-red-600 dark:text-red-300 font-medium mb-2">This action will:</p>
                <ul className="list-disc pl-5 space-y-1 text-red-600 dark:text-red-300">
                    <li>Remove their access to this project</li>
                    <li>Unassign them from all tasks</li>
                    <li>Remove them from project communications</li>
                    <li>This action cannot be undone</li>
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
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Remove Member
                </button>
            </div>
        </div>
    )
}
