import { useState, useEffect } from "react";
import { NotificationItem } from "../components/NotificationItem";
import { Trash2 } from "lucide-react";
import { filterNotifications } from "../utils/filterUtils";
import SearchBar from "../components/SearchBar";
import EmptyNotifications from "../components/EmptyNotifications";
import notificationService from "../services/notificationService";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
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

  const handleMarkAsViewed = (id) => {
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
  };

  const handleMarkSelectedAsViewed = () => {
    const currentTime = new Date().toISOString();
    setNotifications((prev) =>
      prev.map((notification) =>
        selectedIds.includes(notification.id)
          ? { ...notification, isViewed: true, updated_at: currentTime }
          : notification
      )
    );
    setSelectedIds([]);
  };

  const handleMarkSelectedAsUnviewed = () => {
    const currentTime = new Date().toISOString();
    setNotifications((prev) =>
      prev.map((notification) =>
        selectedIds.includes(notification.id)
          ? { ...notification, isViewed: false, updated_at: currentTime }
          : notification
      )
    );
    setSelectedIds([]);
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
  };

  const handleDeleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
  };

  // Use filterNotifications utility
  const filteredNotifications = filterNotifications(notifications, { search });

  const unviewedCount = filteredNotifications.filter((n) => !n.isViewed).length;
  const totalCount = filteredNotifications.length;

  if (loading) {
    return (
      <div className="w-full p-4 text-center text-gray-500 dark:text-gray-300">
        Loading notifications...
      </div>
    );
  }
  if (error) {
    return <div className="w-full p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Notifications
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {unviewedCount} unviewed of {totalCount} total notification
          {totalCount !== 1 ? "s" : ""}
        </p>
        {/* Search Bar */}
        <div className="mt-4 w-full sm:w-96">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notifications..."
          />
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-gray-100 dark:bg-black border border-gray-200 dark:border-white rounded-lg p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-white">
              {selectedIds.length} selected
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleMarkSelectedAsViewed}
                className="px-3 py-1.5 text-sm bg-white dark:bg-black border border-gray-300 dark:border-white text-gray-700 dark:text-white rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Mark as Viewed
              </button>
              <button
                onClick={handleMarkSelectedAsUnviewed}
                className="px-3 py-1.5 text-sm bg-white dark:bg-black border border-gray-300 dark:border-white text-gray-700 dark:text-white rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Mark as Unviewed
              </button>
              <button
                onClick={handleDeleteSelected}
                className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Select All */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={
              selectedIds.length === filteredNotifications.length &&
              filteredNotifications.length > 0
            }
            onChange={handleSelectAll}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          Select all visible notifications
        </label>
      </div>

      {/* Notifications */}
      <div className="space-y-0">
        {filteredNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            isSelected={selectedIds.includes(notification.id)}
            onSelect={handleSelectNotification}
            onMarkAsViewed={handleMarkAsViewed}
            onDelete={handleDeleteNotification}
          />
        ))}
      </div>

      {filteredNotifications.length === 0 && <EmptyNotifications />}
    </div>
  );
};

export default Notifications;
