import { User, Calendar, Trash2 } from "lucide-react";

export function NotificationItem({
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  const getNotificationIcon = () => {
    // Default icon for all notifications
    return <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
  };

  return (
    <div
      className={`
        relative bg-white dark:bg-black border border-gray-200 dark:border-white rounded-lg p-4 mb-3
        transition-all duration-200 hover:shadow-md cursor-pointer
        ${!notification.isViewed ? "border-l-4 border-l-blue-500" : ""}
        ${isSelected ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-gray-900" : ""}
      `}
      onClick={() => onSelect(notification.id)}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(notification.id)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Icon */}
        <div className="flex-shrink-0 pt-1">
          <div className="h-8 w-8 bg-gray-100 dark:bg-white rounded-full flex items-center justify-center">
            {getNotificationIcon()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {notification.title}
              </h3>
              {!notification.isViewed && (
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
              )}
            </div>

            {/* Status Badge */}
            <div className="flex-shrink-0">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  notification.isViewed
                    ? "bg-gray-100 text-gray-600 dark:bg-white dark:text-black"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }`}
              >
                {notification.isViewed ? "Viewed" : "New"}
              </span>
            </div>
          </div>

          {/* Message */}
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            {notification.message}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(notification.created_at)}
              </div>
              {notification.updated_at !== notification.created_at && (
                <div className="flex items-center gap-1">
                  <span>Updated: {formatDate(notification.updated_at)}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {!notification.isViewed && (
                <button
                  onClick={handleMarkAsViewed}
                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
                >
                  Mark as viewed
                </button>
              )}
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
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
