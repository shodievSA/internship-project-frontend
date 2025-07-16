import { useEffect, useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent, useDroppable, DragOverlay } from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Task, TaskStatus } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";
import { useUpdateTaskStatus } from "@/hooks/useTasks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Project } from "@/types/project";

const STATUS_COLUMNS = [
  { key: TaskStatus.TODO, label: "To Do", color: "bg-blue-50" },
  { key: TaskStatus.IN_PROGRESS, label: "In Progress", color: "bg-yellow-50" },
  { key: TaskStatus.DONE, label: "Done", color: "bg-green-50" },
];

type ColumnsType = { [key in TaskStatus]: Task[] };

function SortableTaskCard({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 50 : undefined,
    cursor: 'grab',
    userSelect: isDragging ? 'none' : 'auto' as any,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

function DroppableColumn({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} id={id} className="flex-1 rounded-2xl p-4 shadow-md min-w-[320px] transition-colors">
      {children}
    </div>
  );
}

function stringToColor(str: string) {
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

export default function TaskBoard({ project }: { project: Project }) {
  const { tasks = [], isLoading, refetch } = useTasks({ projectId: project.id });
  // Hook to update task status in taskboard
  const { updateTaskStatus } = useUpdateTaskStatus();
  const [columns, setColumns] = useState<ColumnsType>({
    [TaskStatus.TODO]: [],
    [TaskStatus.IN_PROGRESS]: [],
    [TaskStatus.DONE]: [],
  });
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const validStatuses = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

  useEffect(() => {
    const grouped: ColumnsType = {
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.DONE]: [],
    };
    tasks.forEach((t: Task) => {
      if (grouped[t.status]) grouped[t.status].push(t);
    });
    setColumns(grouped);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Start dragging after moving 5px, like Trello
      },
    })
  );

  const handleDragStart = (event: any) => {
    const taskId = event.active.id as string;
    setActiveTask(tasks.find((t) => t.id === taskId) || null);
    setDraggedId(taskId);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);
    setDraggedId(null);
    const { active, over } = event;
    if (!over) return;
    const activeTaskId = active.id as string;
    const overId = over.id as string;

    // Helper to resolve the column id
    const getColumnId = (overId: string): TaskStatus | null => {
      if (validStatuses.includes(overId as TaskStatus)) return overId as TaskStatus;
      const task = tasks.find((t) => t.id === overId);
      return task ? task.status : null;
    };

    // Find the source and destination columns
    let sourceCol: TaskStatus | null = null;
    let destCol: TaskStatus | null = null;
    (Object.entries(columns) as [TaskStatus, Task[]][]).forEach(([status, tasks]) => {
      if (tasks.find((t) => t.id === activeTaskId)) sourceCol = status;
      if (tasks.find((t) => t.id === overId)) destCol = status;
    });
    // If dropped on a column, treat as move to top
    if (validStatuses.includes(overId as TaskStatus)) {
      destCol = overId as TaskStatus;
    }
    if (!sourceCol || !destCol) return;

    // If moving within the same column (reorder)
    if (sourceCol === destCol) {
      const oldIndex = (columns[sourceCol] as Task[]).findIndex((t) => t.id === activeTaskId);
      const newIndex = (columns[sourceCol] as Task[]).findIndex((t) => t.id === overId);
      if (oldIndex === newIndex) return;
      const newTasks = arrayMove(columns[sourceCol] as Task[], oldIndex, newIndex);
      setColumns((prev) => ({
        ...prev,
        [sourceCol!]: newTasks,
      }));
      refetch();
      return;
    }

    // If moving to a different column, move to top
    const task = tasks.find((t) => t.id === activeTaskId);
    if (!task) return;
    setColumns((prev) => {
      const newSource = prev[sourceCol!].filter((t) => t.id !== activeTaskId);
      const newDest = [{ ...task, status: destCol! }, ...prev[destCol!]];
      return {
        ...prev,
        [sourceCol!]: newSource,
        [destCol!]: newDest,
      };
    });
    await updateTaskStatus(activeTaskId, destCol!);
    refetch();
  };

  const handleDragCancel = () => {
    setActiveTask(null);
    setDraggedId(null);
  };

  return (
    <div className="flex gap-8 w-full py-4 px-2 md:px-0 min-h-[70vh]">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {STATUS_COLUMNS.map((col) => (
          <DroppableColumn key={col.key} id={col.key}>
            <div className={`flex flex-col h-full min-h-[60vh] transition-colors ${col.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl tracking-tight text-gray-800">{col.label}</h2>
                <span className="bg-white/80 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
                  {columns[col.key]?.length || 0}
                </span>
              </div>
              <SortableContext id={col.key} items={columns[col.key]?.map((t: Task) => t.id) || []} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3 min-h-[120px] flex-1">
                  {columns[col.key]?.map((task: Task) => {
                    const isOverdue = task.dueDate && task.dueDate < new Date().toISOString().slice(0, 10);
                    const isDragging = draggedId === task.id;
                    const firstAssignee = task.assignments && task.assignments.length > 0 ? task.assignments[0].user : null;
                    return (
                      <SortableTaskCard id={task.id} key={task.id}>
                        <Card
                          id={task.id}
                          className={`rounded-xl border border-gray-200 bg-white shadow-sm p-5 flex flex-col gap-3 min-w-[300px] ${isDragging ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-bold text-lg text-gray-900 mb-1">{task.title}</div>
                            </div>
                            <span className={
                              task.status === "IN_PROGRESS"
                                ? "bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-lg"
                                : task.status === "TODO"
                                  ? "bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-lg"
                                  : "bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-lg"
                            }>
                              {task.status === "IN_PROGRESS"
                                ? "In Progress"
                                : task.status === "TODO"
                                  ? "To Do"
                                  : "Done"}
                            </span>
                          </div>
                          <div className="text-gray-500 text-sm mb-2">{task.description}</div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-base"
                                style={{
                                  backgroundColor: firstAssignee ? stringToColor(`${firstAssignee.firstName} ${firstAssignee.lastName}`) : '#888',
                                  userSelect: 'none',
                                }}
                              >
                                {firstAssignee
                                  ? `${firstAssignee.firstName[0] || ''}${firstAssignee.lastName[0] || ''}`.toUpperCase()
                                  : '?'}
                              </div>
                              <span className="text-gray-700 font-medium text-sm">
                                {firstAssignee
                                  ? `${firstAssignee.firstName} ${firstAssignee.lastName}`
                                  : "Unassigned"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M8 2v2m8-2v2m-9 4h10M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M5 8V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2M5 8h14"/>
                                <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                              {task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString()
                                : "--/--/----"}
                            </div>
                          </div>
                        </Card>
                      </SortableTaskCard>
                    );
                  })}
                </div>
              </SortableContext>
            </div>
          </DroppableColumn>
        ))}
        <DragOverlay>
          {activeTask ? (
            <Card
              className="rounded-xl border border-gray-200 bg-white shadow-lg p-5 flex flex-col gap-3 min-w-[300px] opacity-90"
              style={{ pointerEvents: 'none' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-lg text-gray-900 mb-1">{activeTask.title}</div>
                </div>
                <span className={
                  activeTask.status === "IN_PROGRESS"
                    ? "bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-lg"
                    : activeTask.status === "TODO"
                      ? "bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-lg"
                      : "bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-lg"
                }>
                  {activeTask.status === "IN_PROGRESS"
                    ? "In Progress"
                    : activeTask.status === "TODO"
                      ? "To Do"
                      : "Done"}
                </span>
              </div>
              <div className="text-gray-500 text-sm mb-2">{activeTask.description}</div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-base"
                    style={{
                      backgroundColor: activeTask.assignments && activeTask.assignments.length > 0
                        ? stringToColor(`${activeTask.assignments[0].user.firstName} ${activeTask.assignments[0].user.lastName}`)
                        : '#888',
                      userSelect: 'none',
                    }}
                  >
                    {activeTask.assignments && activeTask.assignments.length > 0
                      ? `${activeTask.assignments[0].user.firstName[0] || ''}${activeTask.assignments[0].user.lastName[0] || ''}`.toUpperCase()
                      : '?'}
                  </div>
                  <span className="text-gray-700 font-medium text-sm">
                    {activeTask.assignments && activeTask.assignments.length > 0
                      ? `${activeTask.assignments[0].user.firstName} ${activeTask.assignments[0].user.lastName}`
                      : "Unassigned"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M8 2v2m8-2v2m-9 4h10M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M5 8V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2M5 8h14"/>
                    <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  {activeTask.dueDate
                    ? new Date(activeTask.dueDate).toLocaleDateString()
                    : "--/--/----"}
                </div>
              </div>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
} 