import { useState, useMemo } from "react";
import { useProject } from "../context/ProjectContext";
import { Calendar, Filter, UserPlus } from "lucide-react";
import { CustomDropdown } from "../components/CustomDropdown";
import { statusOptionsInviation, dateOptions } from "../utils/constant";
import { ProjectInvitationCard } from "../components/ProjectInvitationCard";
import { EmptyInvitation } from "../components/EmptyInvitation";
import Button from "../components/ui/Button";
import SearchBar from "../components/SearchBar";
import SendInviteModal from "../components/SendInviteModal";
import EmptyProjectInvites from "../components/EmptyProjectInvites";
import Unauthorized from "../components/Unauthorized";

function ProjectInvitesPage() {

    const { invites, setInvites, projectLoaded, currentMemberRole } = useProject();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [showInviteModal, setShowInviteModal] = useState(false);

    function openModal() {
        setShowInviteModal(true);
    }

    function closeModal() {
        setShowInviteModal(false);
    }

    function handleNewInvite(newInvite) {

        setInvites((prevInvites) => {
            return [newInvite, ...prevInvites]
        })

    }

    const filteredInvites = useMemo(() => {

        if (!projectLoaded || !invites) return [];

        return invites.filter((invite) => {

            const matchesSearch =
                invite.receiverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                invite.receiverEmail.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === "all" || invite.status === statusFilter;

            return matchesSearch && matchesStatus;

        });

    }, [projectLoaded, invites, statusFilter, searchTerm]);

    if (currentMemberRole !== 'admin') return <Unauthorized message={`Oops! Looks like this page is for special eyes only - ${currentMemberRole}s not allowed.`} />
    if (showInviteModal) return <SendInviteModal closeModal={closeModal} onNewInviteCreated={handleNewInvite} />
    if (invites.length === 0) return <EmptyProjectInvites openModal={openModal} />

    return (
        <div className="h-full">
            <div className="bg-white dark:bg-black text-gray-900 dark:text-white">
                <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-6">
                    <div className="flex justify-start w-full lg:w-1/3">
                        <div className="relative w-full">
                            <SearchBar
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by project, inviter name or email..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="flex flex-col sm:flex-row gap-3">
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
                        <Button
                            variant="secondary"
                            size="md"
                            className='flex items-center gap-x-2'
                            onClick={() => setShowInviteModal(true)}
                        >
                            <UserPlus className="h-4 w-4" />
                            <span className="font-medium">Send Invite</span>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-y-5 pb-10">
                    {
                        filteredInvites.length > 0 ? (
                            filteredInvites.map((invite) => (
                                <ProjectInvitationCard key={invite.id} invite={invite} />
                            ))
                        ) : (
                            <EmptyInvitation />
                        )
                    }
                </div>
            </div>
        </div>
    );

}

export default ProjectInvitesPage;
