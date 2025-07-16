import React, { useState } from "react";
import { AlignLeft } from "lucide-react";
import CardModal from "./ui/CardModal";

const PRIORITY_STYLES = {
    low: {
        label: "Low",
        className: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
        dot: "bg-green-500",
    },
    middle: {
        label: "Middle",
        className: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700",
        dot: "bg-orange-400",
    },
    high: {
        label: "High",
        className: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
        dot: "bg-red-500",
    },
};

// Generate a consistent color from a string (user name)
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
}

const STATUS_COLORS = {
    'ongoing': '#42A5F5',      // blue
    'under review': '#8e24aa',// purple
    'rejected': '#EF5350',    // red
    'closed': '#66BB6A',      // green
};

function TaskKanbanCard({ task, colKey, isDragging }) {
    const [showModal, setShowModal] = useState(false);
    const priority = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.low;
    // Prefer assignedTo from task, fallback to assignments[0]?.user
    const assignedTo = task.assignedTo || (task.assignments?.[0]?.user);
    let initials = '';
    if (assignedTo && assignedTo.name) {
        const parts = assignedTo.name.trim().split(' ');
        if (parts.length === 1) {
            initials = parts[0][0].toUpperCase();
        } else if (parts.length > 1) {
            initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
    }
    const fullName = assignedTo ? (assignedTo.name || `${assignedTo.firstName || ''} ${assignedTo.lastName || ''}`) : "Unassigned";
    const avatarBg = assignedTo ? stringToColor(fullName) : '#64748b'; // fallback: slate-500

    const headerColor = STATUS_COLORS[task.status] || '#42A5F5'; // default to blue

    return (
        <div className="rounded-2xl shadow-md bg-white">
            <div
                className="rounded-t-2xl px-4 py-3"
                style={{ background: headerColor }}
            />
            {/* Title and priority badge */}
            <div className="flex items-start justify-between gap-2 px-4 pt-2 pb-1">
                <h2 className="font-bold text-lg text-gray-800">{task.title}</h2>
            </div>
            {/* Card content with padding */}
            <div className="flex-1 flex flex-col p-4 pt-1 pb-2">
                {/* Footer: Description icon and Avatar */}
                <div className="flex items-center justify-between mt-auto pt-1">
                    {/* Description icon if description exists */}
                    {task.description && (
                        <AlignLeft
                            className="w-4 h-4 text-gray-400 mr-2 cursor-pointer"
                            title="Has description"
                            onClick={() => setShowModal(true)}
                        />
                    )}
                    <div className="relative group/avatar ml-auto flex items-center gap-2">
                        {assignedTo && assignedTo.avatarUrl ? (
                            <img
                                src={assignedTo.avatarUrl}
                                alt={fullName}
                                className="w-8 h-8 rounded-full border-2 border-white shadow"
                                title={fullName}
                            />
                        ) : (
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-md select-none cursor-pointer"
                                style={{ backgroundColor: avatarBg }}
                                title={fullName}
                            >
                                {initials || <span className="text-xs">?</span>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modal */}
            {showModal && (
                <CardModal open={showModal} onClose={() => setShowModal(false)} headerColor={headerColor} status={task.status}>
                    {/* Empty body for now */}
                </CardModal>
            )}
        </div>
    );
}

export default TaskKanbanCard; 