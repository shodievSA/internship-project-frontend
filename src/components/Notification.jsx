import { formatIsoDate, getTimeFromIso } from "../utils/formatIsoDate";
import { Calendar, Trash2, Clock } from "lucide-react";

function Notification({
	notification,
	isSelected,
	onSelect,
	onMarkAsViewed,
	onMarkAsUnviewed,
	onDelete,
}) {

	const handleMarkAsViewed = (e) => {

		e.stopPropagation();
		onMarkAsViewed(notification.id);

	};

	const handleMarkAsUnviewed = (e) => {

		e.stopPropagation();
		onMarkAsUnviewed(notification.id);

	}

	const handleDelete = (e) => {

		e.stopPropagation();
		onDelete(notification.id);

	};

	return (
		<div
			id={"notification-" + notification.id}
			className={`relative border border-gray-200 dark:border-neutral-800 
			hover:bg-slate-100 hover:dark:bg-[rgb(15,15,15)] rounded-md p-3 
			transition-all duration-200 cursor-pointer
			${!notification.isViewed
				? "border-l-[6px] border-l-blue-500 dark:border-l-blue-500"
				: "border"
			}
			${isSelected ? "bg-slate-100 dark:bg-[rgb(15,15,15)]" : "bg-white dark:bg-black"}`}
			onClick={() => onSelect(notification.id)}
		>
			<div className="flex items-start gap-5">
				{/* Content */}
				<div className="flex-1 min-w-0 px-3">
					{ /* Title */ }
					<div className="flex items-start justify-between gap-2">
						<div>
							<h3 className="font-medium text-gray-900 dark:text-white">
								{notification.title}
							</h3>
						</div>

						<div className="flex-shrink-0">
							<span
							className={`px-3 py-1 text-xs font-medium rounded-full 
							${ notification.isViewed
								? "bg-gray-100 text-gray-600 dark:bg-white dark:text-black"
								: "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-500"
							}`}
							>
								{notification.isViewed ? "Viewed" : "New"}
							</span>
						</div>
					</div>
					{ /* Message */ }
					<div 
						className="text-neutral-700 dark:text-neutral-400 text-sm line-clamp-2 mt-2" 
						dangerouslySetInnerHTML={{ __html: notification.message }} 
					/>
					{/* Footer */}
					<div className="flex items-center justify-between mt-2">
						<div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
							<div className="flex items-center gap-1.5">
								<Calendar className="h-3 w-3" />
								<span>{ formatIsoDate(notification.createdAt) }</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Clock className="h-3 w-3" />
								<span>{ getTimeFromIso(notification.createdAt) }</span>
							</div>
						</div>
						{/* Actions */}
						<div className="flex items-center gap-4">
							{notification.isViewed ? (
								<button
									onClick={handleMarkAsUnviewed}
									className="text-sm text-blue-600 dark:text-blue-500 rounded-md transition-all py-2 px-3 
									hover:bg-blue-600/10 dark:hover:bg-blue-500/10"
								>
									Mark as unread
								</button>
							) : (
								<button
									onClick={handleMarkAsViewed}
									className="text-sm text-blue-600 dark:text-blue-500 rounded-md transition-all py-2 px-3 
									hover:bg-blue-600/10 dark:hover:bg-blue-500/10"
								>
									Mark as read
								</button>
							)}
							<button
								onClick={handleDelete}
								className="text-red-500 dark:text-red-600 transition-all duration-300 p-2 
								dark:hover:bg-red-600/20 hover:bg-red-500/20 rounded-md"
							>
								<Trash2 className="h-4 w-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default Notification;
