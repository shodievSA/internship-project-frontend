import { useState, useMemo } from "react";
import { useProject } from "../context/ProjectContext";
import { taskStatusOptions, dateOptions } from "../utils/constant";
import SearchBar from "../components/SearchBar";
import { CustomDropdown } from "../components/CustomDropdown";
import EmptySearch from "../components/EmptySearch";
import ReviewTask from "../components/ReviewTask";
import EmptyState from "../components/EmptyState";
import { Calendar, Filter } from "lucide-react";
import Unauthorized from "../components/Unauthorized";

function ReviewTasksPage() {

    const { 
		projectLoaded, 
		tasks, 
		setTasks, 
		currentMemberId, 
		currentMemberRole 
	} = useProject();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");

    const reviewTasks = useMemo(() => {

        if (!projectLoaded || !tasks) return [];

		return tasks.filter((task) => {
			return task.assignedBy.id === currentMemberId && task.status === "under review"
		});

    }, [tasks, projectLoaded, currentMemberId]);

    const filteredTasks = useMemo(() => {

        return reviewTasks.filter((task) => {

            const matchesSearch =
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.assignedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.assignedTo.name.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = statusFilter === "all" || task.status === statusFilter;

            return matchesSearch && matchesStatus;

        });

    }, [reviewTasks, searchTerm, statusFilter]);

    function clearFilters() {

        setSearchTerm("");
        setStatusFilter("all");
        setDateFilter("all");

    };

    function onTaskApprove(taskId, updatedTask) {

        setTasks((prevTasks) => prevTasks.map((task) => {
            return (task.id === taskId) ? updatedTask : task;
        }));

    }

    function onTaskReject(taskId, updatedTask) {

        setTasks((prevTasks) => prevTasks.map((task) => {
            return (task.id === taskId) ? updatedTask : task;
        }));

    }

    if (currentMemberRole === 'member') return <Unauthorized message={`Oops! Looks like this page is for special eyes only - ${currentMemberRole}s not allowed.`} />
    if (reviewTasks.length === 0) return <EmptyState message={"You’re all caught up - no tasks to review for now. Time to kick back and enjoy the calm!"} />

    return (
        <div className="h-full">
            <div className="flex flex-col h-full">
                <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-6">
                    <div className="flex justify-start w-full lg:w-1/3">
                        <div className="relative w-full">
                            <SearchBar
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by task title, assignee or assigner name"
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
                                <ReviewTask
                                    key={task.id}
                                    task={task}
                                    onTaskApprove={onTaskApprove}
                                    onTaskReject={onTaskReject}
                                />
                            ))
                        ) : (
                            <EmptySearch
                                message={"No matching tasks found"}
                                onClearFilters={clearFilters}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );

}

export default ReviewTasksPage;