import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

function SprintSelectionDropdown({
  sprints = [],
  selectedSprintId,
  onSprintChange,
  className = "",
  showAllSprints = true,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedSprint = sprints.find(
    (sprint) => sprint.id === selectedSprintId
  );

  const handleSprintChange = (sprintId) => {
    onSprintChange(sprintId);
    setIsDropdownOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "planned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
      case "overdue":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-x-2 px-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {selectedSprint ? selectedSprint.title : "All Sprints"}
        </span>
        {selectedSprint && (
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
              selectedSprint.status
            )}`}
          >
            {selectedSprint.status}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-1 w-64 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto transition-all duration-300 ease-in-out transform origin-top ${
          isDropdownOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="p-2">
          {/* All Sprints Option */}
          {showAllSprints && (
            <>
              <button
                onClick={() => handleSprintChange(null)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                  selectedSprintId === null
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">All Sprints</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {sprints.length} sprints
                  </span>
                </div>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            </>
          )}

          {/* Sprint Options */}
          {sprints.map((sprint) => (
            <button
              key={sprint.id}
              onClick={() => handleSprintChange(sprint.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                selectedSprintId === sprint.id
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{sprint.title}</span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                    sprint.status
                  )}`}
                >
                  {sprint.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SprintSelectionDropdown;
