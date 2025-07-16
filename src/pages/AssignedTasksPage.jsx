import { useMemo, useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useAuthContext } from "../context/AuthContext";
import { taskStatusOptions, dateOptions } from "../utils/constant";
import SearchBar from "../components/SearchBar";
import { CustomDropdown } from "../components/CustomDropdown";
import EmptySearch from "../components/EmptySearch";
import AssignedTask from "../components/AssignedTask";
import EmptyState from "../components/EmptyState";
import { Calendar, Filter } from "lucide-react";
import Unauthorized from "../components/Unauthorized";

function AssignedTasksPage() {

    const {
        projectLoaded,
        tasks,
        team,
        currentMemberId,
        currentMemberRole,
        metaData
    } = useProject();
    const { user } = useAuthContext();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");

    const assignedTasks = useMemo(() => {
        if (!projectLoaded || !tasks || !user || !user.fullName) return [];
        return tasks.filter((task) => {
            if (!task.assignedBy) {
                console.log("[DEBUG] Task missing assignedBy:", task);
                return false;
            }
            if (typeof task.assignedBy === "object" && task.assignedBy.id) {
                const match = task.assignedBy.id === currentMemberId;
                if (match) console.log("[DEBUG] Task matched by id:", task);
                return match;
            }
            if (task.assignedBy.name && user && user.fullName) {
                const match = task.assignedBy.name.trim().toLowerCase() === user.fullName.trim().toLowerCase();
                if (match) console.log("[DEBUG] Task matched by name:", task);
                return match;
            }
            console.log("[DEBUG] Task did not match:", task);
            return false;
        });
    }, [projectLoaded, tasks, currentMemberId, user]);

    const filteredTasks = useMemo(() => {

        return assignedTasks.filter((task) => {

            const matchesSearch =
                task.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
                ||
                task.assignedTo.name.toLowerCase().includes(searchTerm.trim().toLowerCase())

            const matchesStatus = statusFilter === "all" || task.status === statusFilter;

            return matchesSearch && matchesStatus;

        });

    }, [searchTerm, statusFilter, assignedTasks]);

    function clearFilters() {

        setSearchTerm("");
        setStatusFilter("all");
        setDateFilter("all");

    }

    if (currentMemberRole === 'member') return <Unauthorized message={`Oops! Looks like this page is for special eyes only - ${currentMemberRole}s not allowed.`} />
    if (assignedTasks.length === 0) return <EmptyState message={"You haven’t assigned any tasks yet... your clipboard is feeling lonely!"} />

    return (
        <div className="h-full">
            <div className="flex flex-col h-full">
                <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-6">
                    <div className="flex justify-start w-full lg:w-1/3">
                        <div className="relative w-full">
                            <SearchBar
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by task title or assignee name"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <CustomDropdown
                                value={statusFilter}
                                onChange={setStatusFilter}
                                options={taskStatusOptions}
                                placeholder="All Status"
                                icon={Filter}
                                className="w-full sm:w-auto"
                            />
                            <CustomDropdown
                                value={dateFilter}
                                onChange={setDateFilter}
                                options={dateOptions}
                                placeholder="All Dates"
                                icon={Calendar}
                                className="w-full sm:w-auto"
                            />
                        </div>
                    </div>
                </div>
                <div className="grow flex flex-col gap-y-8 pb-10">
                    {
                        filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <AssignedTask
                                    key={task.id}
                                    task={task}
                                    projectId={metaData.id}
                                    team={team}
                                />
                            ))
                        ) : (
                            <EmptySearch
                                message={"No matching assigned tasks found"}
                                onClearFilters={clearFilters}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );

}

export default AssignedTasksPage;