import { useState, useEffect } from "react";
import { Calendar, Filter } from "lucide-react";
import UserInviteCard from "../components/UserInviteCard";
import { CustomDropdown } from "../components/CustomDropdown";
import { statusOptionsInviation, dateOptions } from "../utils/constant";
import { filterInvitations } from "../utils/filterUtils";
import SearchBar from "../components/SearchBar";
import { EmptyInvitation } from "../components/EmptyInvitation";
import LoadingInvites from "../components/LoadingInvites";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function Invites() {

    const [invites, setInvites] = useState([]);
    const [invitesFetched, setInvitesFetched] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [loading, setLoading] = useState(true)

    async function handleInvite(status, projectId, inviteId) {

        try {

            const res = await fetch(
                `${SERVER_BASE_URL}/api/v1/projects/${projectId}/invites/${inviteId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ status: status })
                }
            );

            if (!res.ok) {

                throw new Error("Error occurred while accepting invite");

            } else {

                setInvites((prev) =>
                    prev.map((inv) => (inv.id === inviteId ? { ...inv, status: status } : inv))
                );

            }

        } catch (err) {

            console.log(err);

        }

    };

    const filteredInvites = filterInvitations(invites, {
        search: searchTerm,
        status: statusFilter,
        date: dateFilter,
    });

    useEffect(() => {

        async function getUserInvites() {

            try {

                const res = await fetch(`${SERVER_BASE_URL}/api/v1/me/invites`, {
                    method: "GET",
                    credentials: "include"
                });

                const { invites } = await res.json();

                setInvites(invites);

            } catch (err) {

                console.log(err);

            } finally {
                setTimeout(() => {
                    setLoading(false);
                    setInvitesFetched(true);
                }, 600)

            }

        }

        getUserInvites();

    }, []);

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

export default Invites;