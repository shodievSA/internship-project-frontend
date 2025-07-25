import { useState } from "react";
import { useNotifications } from "../context/NotificationsContext";
import userService from "../services/userService";
import { incrementProjectCount } from "../utils/localStorageUtils";
import UserInviteCard from "../components/UserInviteCard";
import { CustomDropdown } from "../components/CustomDropdown";
import { statusOptionsInviation, dateOptions } from "../utils/constant";
import { filterInvitations } from "../utils/filterUtils";
import SearchBar from "../components/SearchBar";
import { EmptyInvitation } from "../components/EmptyInvitation";
import LoadingInvites from "../components/LoadingInvites";
import { Calendar, Filter } from "lucide-react";

function UserInvites() {

	const { invitesFetched, invites, setInvites } = useNotifications();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");

    async function handleInvite(updatedStatus, projectId, inviteId) {

        try {

			await userService.updateInviteStatus({ updatedStatus, projectId, inviteId });
            
			setInvites((prev) =>
				prev.map((inv) => (inv.id === inviteId ? { ...inv, status: updatedStatus } : inv))
			);

			if (updatedStatus === "accepted") incrementProjectCount();
 
        } catch (err) {

            console.log(err);

        }

    };

    const filteredInvites = filterInvitations(invites, {
        search: searchTerm,
        status: statusFilter,
        date: dateFilter,
    });

    return (
        <div className="h-full bg-white dark:bg-black text-gray-900 dark:text-white p-4 md:p-6">
            {
                !invitesFetched ? (
                    <LoadingInvites />
                ) : invites.length === 0 ? (
                    <EmptyInvitation />
                ) : (
                    <div className="w-full">
                        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-x-6 mb-6 w-full">
                            <div className="w-full lg:w-96 mb-4 lg:mb-0">
                                <SearchBar
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by project, inviter name or email..."
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full 
							lg:w-auto lg:ml-auto">
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
                        <div className="space-y-4">
                            {
                                filteredInvites.length > 0 ? (
                                    filteredInvites.map((invite) => (
                                        <UserInviteCard
                                            key={invite.id}
                                            invite={invite}
                                            onRespond={handleInvite}
                                        />
                                    ))
                                ) : (
                                    <div>No results that match your query</div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );

}

export default UserInvites;