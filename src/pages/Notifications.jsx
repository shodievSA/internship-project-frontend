import { useState, useEffect } from "react";
import NotificationItem from "../components/NotificationItem";
import { Trash2 } from "lucide-react";
import { filterNotifications } from "../utils/filterUtils";
import SearchBar from "../components/SearchBar";
import EmptyNotifications from "../components/EmptyNotifications";
import notificationService from "../services/notificationService";
import ErrorState from "../components/ErrorState";
import EmptySearch from "../components/EmptySearch";
import LoadingNotifications from "../components/LoadingNotifications";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("ss");

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await notificationService.getNotifications();
        setNotifications(data);

        console.log("Fetched notifications:", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 600);
      }
    };

    fetchNotifications();
  }, []);

  const handleSelectNotification = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === notifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(notifications.map((n) => n.id));
    }
  };

  const handleMarkAsViewed = async (id) => {
    const prevNotifications = notifications;
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              isViewed: true,
              updated_at: new Date().toISOString(),
            }
          : notification
      )
    );
    try {
      await notificationService.updateNotificationViewStatus([id], true);
    } catch (err) {
      setNotifications(prevNotifications);
      // Optionally show error toast
    }
  };

  const handleMarkSelectedAsViewed = async () => {
    const currentTime = new Date().toISOString();
    const prevNotifications = notifications;
    setNotifications((prev) =>
      prev.map((notification) =>
        selectedIds.includes(notification.id)
          ? { ...notification, isViewed: true, updated_at: currentTime }
          : notification
      )
    );
    setSelectedIds([]);
    try {
      await notificationService.updateNotificationViewStatus(selectedIds, true);
    } catch (err) {
      setNotifications(prevNotifications);
      // Optionally show error toast
    }
  };

  const handleMarkSelectedAsUnviewed = async () => {
    const currentTime = new Date().toISOString();
    const prevNotifications = notifications;
    setNotifications((prev) =>
      prev.map((notification) =>
        selectedIds.includes(notification.id)
          ? { ...notification, isViewed: false, updated_at: currentTime }
          : notification
      )
    );
    setSelectedIds([]);
    try {
      await notificationService.updateNotificationViewStatus(
        selectedIds,
        false
      );
    } catch (err) {
      setNotifications(prevNotifications);
      // Optionally show error toast
    }
  };

  const handleDeleteNotification = async (id) => {
    const prevNotifications = notifications;
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    try {
      await notificationService.deleteNotifications([id]);
    } catch (err) {
      setNotifications(prevNotifications);
      // Optionally show error toast
    }
  };

  const handleDeleteSelected = async () => {
    const prevNotifications = notifications;
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
    try {
      await notificationService.deleteNotifications(selectedIds);
    } catch (err) {
      setNotifications(prevNotifications);
      // Optionally show error toast
    }
  };

  function clearFilters() {
    setSearch("");
  }

  const filteredNotifications = filterNotifications(notifications, { search });

  const unviewedCount = filteredNotifications.filter((n) => !n.isViewed).length;
  const totalCount = filteredNotifications.length;

  if (loading) return <LoadingNotifications />;
  if (error)
    return (
      <ErrorState
        message={"Unexpected error while loading your notifications"}
      />
    );
  if (notifications.length === 0) return <EmptyNotifications />;

  return (
    <div className="h-full px-6 pt-6 md:px-8 md:pt-8">
      <div className="h-full flex flex-col gap-y-10">
        <div className="flex items-center justify-between">
          <div className="w-full sm:w-96">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications..."
            />
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {unviewedCount} unread of {totalCount} total notification
            {totalCount !== 1 ? "s" : ""}
          </p>
        </div>

        {selectedIds.length > 0 && (
          <div className="bg-gray-100 dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="font-medium text-gray-700 dark:text-white">
                {selectedIds.length}{" "}
                {selectedIds.length === 1 ? "notification" : "notifications"}{" "}
                selected
              </span>
              <div className="flex flex-wrap gap-5">
                <button
                  onClick={handleMarkSelectedAsViewed}
                  className="px-3 py-1.5 text-sm bg-white dark:bg-black border border-gray-300 
										dark:border-neutral-800 text-gray-700 dark:text-white rounded-md hover:bg-gray-50 
										dark:hover:bg-neutral-900 transition-colors"
                >
                  Mark as Read
                </button>
                <button
                  onClick={handleMarkSelectedAsUnviewed}
                  className="px-3 py-1.5 text-sm bg-white dark:bg-black border border-gray-300 
										dark:border-neutral-800 text-gray-700 dark:text-white rounded-md hover:bg-gray-50 
										dark:hover:bg-neutral-900 transition-colors"
                >
                  Mark as Unread
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="px-3 py-1.5 text-sm bg-red-600 dark:bg-red-800 text-white rounded-md 
										hover:bg-red-700 dark:hover:bg-red-900 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="flex items-center gap-4 text-gray-600 dark:text-gray-300 cursor-pointer">
            <div
              className="flex items-center justify-center w-5 h-5 bg-white dark:bg-neutral-800 rounded-full 
							p-0.5 cursor-pointer border border-neutral-500"
              onClick={handleSelectAll}
            >
              <div
                className={`h-3 w-3 ${
                  selectedIds.length === filteredNotifications.length &&
                  filteredNotifications.length > 0
                    ? "bg-blue-500"
                    : "bg-white dark:bg-neutral-800"
                }
							rounded-full`}
              ></div>
            </div>
            Select all visible notifications
          </label>
        </div>

        {/* Notifications */}
        <div className="flex flex-col gap-y-2 pb-6 md:pb-8 grow">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isSelected={selectedIds.includes(notification.id)}
                onSelect={handleSelectNotification}
                onMarkAsViewed={handleMarkAsViewed}
                onDelete={handleDeleteNotification}
              />
            ))
          ) : (
            <EmptySearch
              message="No matching notifications"
              onClearFilters={clearFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
