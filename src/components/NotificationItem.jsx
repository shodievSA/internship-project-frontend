import { formatIsoDate } from "../utils/formatIsoDate";
import { Calendar, Trash2 } from "lucide-react";

function NotificationItem({
  notification,
  isSelected,
  onSelect,
  onMarkAsViewed,
  onDelete,
}) {
  const handleMarkAsViewed = (e) => {
    e.stopPropagation();
    onMarkAsViewed(notification.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  return (
    <div
      className={`
			relative bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-md p-4 mb-3
			transition-all duration-300 hover:shadow-md cursor-pointer
			${
        !notification.isViewed
          ? "border-l-[6px] border-l-blue-500 dark:border-l-blue-500"
          : "border"
      }
			${isSelected ? "bg-blue-50/80 dark:bg-neutral-900" : "bg-white dark:bg-black"}
		`}
      onClick={() => onSelect(notification.id)}
    >
      <div className="flex items-start gap-5">
        {/* Checkbox */}
        <div
          className="flex items-center justify-center w-5 h-5 bg-white dark:bg-neutral-800 rounded-full 
					p-0.5 cursor-pointer border border-neutral-500"
          onClick={(e) => {
            onSelect(notification.id);
            e.stopPropagation();
          }}
        >
          <div
            className={`h-3 w-3 rounded-full ${
              isSelected ? "bg-blue-500" : "bg-white dark:bg-neutral-800"
            }`}
          ></div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {notification.title}
              </h3>
            </div>

            <div className="flex-shrink-0">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full 
								${
                  notification.isViewed
                    ? "bg-gray-100 text-gray-600 dark:bg-white dark:text-black"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-500"
                }`}
              >
                {notification.isViewed ? "Viewed" : "New"}
              </span>
            </div>
          </div>

          {/* Message */}
          <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            {notification.message}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>{formatIsoDate(notification.createdAt)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              {!notification.isViewed && (
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

export default NotificationItem;
