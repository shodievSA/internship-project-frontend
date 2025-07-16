import { useEffect, useState } from "react";
import React from "react";
import TaskKanbanCard from "./TaskKanbanCard";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay, useDroppable, useDndMonitor } from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useParams } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { updateTaskStatusService } from '../services/taskService';

// Include 'ongoing' in allowed statuses for columns
const STATUS_COLUMNS = [
    { key: 'ongoing', label: 'Ongoing' },
    { key: 'under review', label: 'Under Review' },
    { key: 'rejected', label: 'Rejected' },
    { key: 'closed', label: 'Closed' },
];

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

function DroppableColumn({ id, children }) {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div ref={setNodeRef} className="w-full rounded-2xl shadow-md transition-colors bg-white dark:bg-gray-800 flex flex-col max-h-[70vh] min-w-[280px]">
            {children}
        </div>
    );
}

// Sortable wrapper for each task card
function SortableTaskCard({ id, children, isDragging }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging: dndDragging } = useSortable({ id });
    if (isDragging) return <div style={{ height: 112, marginBottom: 16 }} />; // Placeholder to prevent dancing
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
        zIndex: dndDragging ? 50 : undefined,
        cursor: 'grab',
        userSelect: dndDragging ? 'none' : 'auto',
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}

// DndMonitor component to use useDndMonitor inside DndContext
function DndMonitor({ setOverId }) {
    useDndMonitor({
        onDragOver: (event) => {
            setOverId(event.over?.id || null);
        },
        onDragEnd: () => {
            setOverId(null);
        },
        onDragCancel: () => {
            setOverId(null);
        },
    });
    return null;
}




function TaskBoard({ tasks = [] }) {
    const [activeId, setActiveId] = useState(null);
    const [overId, setOverId] = useState(null); // Track the id being hovered over
    const { projectId } = useParams();
    const { updateTaskInContext, optimisticUpdateTaskStatus, setTasks } = useProject();

    // Group tasks by allowed statuses only
    const columns = {
        'ongoing': tasks.filter((t) => t.status === 'ongoing'),
        'under review': tasks.filter((t) => t.status === 'under review'),
        'rejected': tasks.filter((t) => t.status === 'rejected'),
        'closed': tasks.filter((t) => t.status === 'closed'),
    };

    // DnD-kit setup
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }
    async function handleDragEnd(event) {
        setActiveId(null);
        setOverId(null);
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;

        // Find source column
        let sourceCol = null;
        for (const col of STATUS_COLUMNS) {
            if (columns[col.key].find((t) => t.id === activeId)) sourceCol = col.key;
        }

        // Determine destination column and index
        let destCol = null;
        let destIndex = null;
        if (STATUS_COLUMNS.some((col) => col.key === overId)) {
            // Dropped on column header
            destCol = overId;
            destIndex = 0;
        } else {
            // Dropped on a task
            for (const col of STATUS_COLUMNS) {
                const idx = columns[col.key].findIndex((t) => t.id === overId);
                if (idx !== -1) {
                    destCol = col.key;
                    destIndex = idx;
                    break;
                }
            }
        }
        if (!sourceCol || !destCol) return;

        // If moving within the same column (reorder)
        if (sourceCol === destCol) {
            const colTasks = columns[sourceCol];
            const oldIndex = colTasks.findIndex((t) => t.id === activeId);
            if (oldIndex === -1 || destIndex === null) return;
            const newColTasks = arrayMove(colTasks, oldIndex, destIndex);
            // Rebuild the tasks array with the new order for this column
            const newTasks = [];
            Object.keys(columns).forEach((colKey) => {
                if (colKey === sourceCol) {
                    newTasks.push(...newColTasks);
                } else {
                    newTasks.push(...columns[colKey]);
                }
            });
            setTasks(newTasks); // <-- THIS IS THE FIX
            return;
        }

        // If moving to a different column, update status and insert at correct position
        const task = tasks.find((t) => t.id === activeId);
        if (!task) return;
        const newStatus = destCol;
        if (!newStatus) return;

        // Optimistically update the UI: remove from old column, insert into new at destIndex
        const newTasks = tasks.filter((t) => t.id !== activeId);
        // Create a copy of the task with updated status
        const updatedTask = { ...task, status: newStatus };
        // Insert at the correct position in the new column
        const before = newTasks.filter((t, i) => {
            if (t.status !== newStatus) return false;
            // Find the index in the new column
            const colTasks = columns[newStatus];
            return colTasks.findIndex((ct, idx) => ct.id === t.id) < destIndex;
        });
        const after = newTasks.filter((t, i) => {
            if (t.status !== newStatus) return false;
            const colTasks = columns[newStatus];
            return colTasks.findIndex((ct, idx) => ct.id === t.id) >= destIndex;
        });
        // Add tasks from other columns
        const other = newTasks.filter((t) => t.status !== newStatus);
        // Rebuild the full tasks array
        const rebuiltTasks = [
            ...other,
            ...before,
            updatedTask,
            ...after
        ];
        // setTasks(rebuiltTasks); // This line was removed as per the new_code, as the tasks prop is now immutable

        // Call backend to update status, and handle errors
        try {
            const backendTask = await updateTaskStatusService({
                projectId,
                taskId: task.id,
                updatedTaskStatus: newStatus,
            });
            updateTaskInContext(backendTask);
        } catch (err) {
            console.error('Failed to update status:', err);
            alert('Failed to update status. Please try again.');
            updateTaskInContext(task);
        }
    }
    function handleDragCancel() {
        setActiveId(null);
        setOverId(null);
    }

    const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

    return (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                {/* DndMonitor as a child of DndContext */}
                <DndMonitor setOverId={setOverId} />
                <div className="flex flex-col md:flex-row gap-4 pb-8 overflow-x-auto items-start">
                    {STATUS_COLUMNS.map((col) => {
                        // Determine if we should show a placeholder in this column
                        let placeholderIndex = null;
                        if (activeId && overId) {
                            // If dragging over a column header, show at top
                            if (overId === col.key) {
                                placeholderIndex = 0;
                            } else {
                                // If dragging over a task in this column, show before that task
                                const idx = columns[col.key].findIndex((t) => t.id === overId);
                                if (idx !== -1) placeholderIndex = idx;
                            }
                        }
                        return (
                            <DroppableColumn key={col.key} id={col.key}>
                                {/* Column Header */}
                                <div className={`${"rounded-t-2xl px-4 py-3 flex items-center justify-between"} ${col.color} dark:opacity-90`}>
                                    <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">{col.label}</h2>
                                    <span className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full px-3 py-1 text-xs font-semibold shadow">
                                        {columns[col.key]?.length || 0}
                                    </span>
                                </div>
                                {/* Tasks */}
                                <SortableContext
                                    id={col.key}
                                    items={columns[col.key].map((t) => t.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="flex-1 min-h-0 flex flex-col gap-4 px-4 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                        {columns[col.key]?.length > 0 ? (
                                            columns[col.key].map((task, idx) => (
                                                <React.Fragment key={task.id}>
                                                    {/* Insert placeholder if needed */}
                                                    {placeholderIndex === idx && activeId !== task.id && (
                                                        <div style={{ height: 112, marginBottom: 16, border: '2px dashed #a0aec0', borderRadius: 12, background: '#f7fafc' }} />
                                                    )}
                                                    <SortableTaskCard id={task.id} isDragging={activeId === task.id}>
                                                        <TaskKanbanCard task={task} colKey={col.key} isDragging={activeId === task.id} />
                                                    </SortableTaskCard>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            // If column is empty, show placeholder if dragging over
                                            placeholderIndex === 0 ? (
                                                <div style={{ height: 112, marginBottom: 16, border: '2px dashed #a0aec0', borderRadius: 12, background: '#f7fafc' }} />
                                            ) : (
                                                <div className="flex-1 min-h-[60px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400 select-none">
                                                    Drop task here
                                                </div>
                                            )
                                        )}
                                        {/* If dragging over after the last item, show placeholder at end */}
                                        {columns[col.key]?.length > 0 && placeholderIndex === columns[col.key].length && (
                                            <div style={{ height: 112, marginBottom: 16, border: '2px dashed #a0aec0', borderRadius: 12, background: '#f7fafc' }} />
                                        )}
                                    </div>
                                </SortableContext>
                            </DroppableColumn>
                        );
                    })}
                </div>
                <DragOverlay>
                    {activeTask ? <TaskKanbanCard task={activeTask} colKey={activeTask.status} isDragging={false} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

export default TaskBoard;