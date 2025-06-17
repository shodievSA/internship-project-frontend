import { useState } from "react";
import { Search, Calendar, Filter, Plus } from "lucide-react";
import { CustomDropdown } from "./CustomDropdown";
import { mockInvitations } from "../utils/data";
import { statusOptionsInviation, dateOptions } from "../utils/constant";
import { getAvatarUrl } from "../utils/constant";
import { ProjectInvitationCard } from "./ProjectInvitationCard";
import { EmptyInvitation } from "./EmptyInvitation";

export function ProjectInvitations() {
  const [invitations, setInvitations] = useState(mockInvitations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredInvitations = invitations.filter((invitation) => {
    const matchesSearch =
      invitation.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.inviterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.inviterEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || invitation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
            Pending
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="">
        {/* Header with Search and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-6">
          {/* Search Bar (left on desktop) */}
          <div className="flex justify-start w-full lg:w-1/3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-neutral-400" />
              <input
                type="text"
                placeholder="Search by project, inviter name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white"
              />
            </div>
          </div>
          {/* Dropdowns and Send Invitation Button (right on desktop) */}
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
            <button
              onClick={() => {
                // TODO: Implement invitation sending logic
                console.log("Send invitation clicked");
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-base font-bold transition-colors focus:outline-none
                bg-gray-900 text-white hover:bg-gray-800
                dark:bg-white dark:text-black dark:hover:bg-neutral-100
                w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Send Invitation
            </button>
          </div>
        </div>

        {/* Invitations List */}
        <div className="space-y-4">
          {filteredInvitations.map((invitation) => (
            <div key={invitation.id} className="relative">
              <ProjectInvitationCard invitation={invitation} getAvatarUrl={getAvatarUrl} />
              <div className="absolute top-4 right-4">
                {getStatusBadge(invitation.status)}
              </div>
            </div>
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
