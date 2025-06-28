import { useState } from "react";
import {
    Calendar,
    Filter,
} from "lucide-react";
import { NotificationCard } from "../components/NotificationCard";
import { CustomDropdown } from "../components/CustomDropdown";
import { statusOptionsInviation, dateOptions } from "../utils/constant";
import { filterInvitations } from "../utils/filterUtils";
import SearchBar from "../components/SearchBar";
import { mockInvitations } from "../utils/data";
import { EmptyInvitation } from "../components/EmptyInvitation";

export default function Notifications() {
    const [invitations, setInvitations] = useState(mockInvitations);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");

    const handleAccept = (id) => {
        setInvitations((prev) =>
            prev.map((inv) => (inv.id === id ? { ...inv, status: "accepted" } : inv))
        );
    };

    const handleReject = (id) => {
        setInvitations((prev) =>
            prev.map((inv) => (inv.id === id ? { ...inv, status: "rejected" } : inv))
        );
    };

    const filteredInvitations = filterInvitations(invitations, {
        search: searchTerm,
        status: statusFilter,
        date: dateFilter,
    });

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-4 md:p-6">
            <div className="w-full">
                {/* Header with Search and Filters */}
                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-x-6 mb-6 w-full">
                    {/* Search Bar (left on desktop) */}
                    <div className="w-full lg:w-96 mb-4 lg:mb-0">
                        <SearchBar
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by project, inviter name or email..."
                        />
                    </div>
                    {/* Dropdowns (right on desktop) */}
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full lg:w-auto lg:ml-auto">
                        <CustomDropdown
                            value={statusFilter}
                            onChange={setStatusFilter}
                            options={statusOptionsInviation}
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

                {/* Invitations List */}
                <div className="space-y-4">
                    {filteredInvitations.map((invitation) => (
                        <NotificationCard
                            key={invitation.id}
                            invitation={invitation}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredInvitations.length === 0 && (
                    <EmptyInvitation />
                )}
            </div>
        </div>
    );
}   
