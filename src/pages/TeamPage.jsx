import { useState } from "react"
import { TeamMembersList } from "../components/team-members-list"
import { teamMembers as initialTeamMembers } from "../utils/data"
import { useOutletContext } from "react-router-dom"

function TeamMembersPage() {

    const { projectData } = useOutletContext();

    const [teamMembers, setTeamMembers] = useState(
        initialTeamMembers.map(member => ({
            ...member,
            projectName: projectData?.name || "Project Name"
        }))
    );
    const [currentUser] = useState(teamMembers[0]);

    const handleRemoveMember = (memberId) => {
        setTeamMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-4">
            <div className="">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Team Members</h1>
                    <span className="text-gray-500 dark:text-gray-400">{teamMembers.length} members</span>
                </header>
                <TeamMembersList 
					members={teamMembers} 
					currentUser={currentUser} 
					onRemoveMember={handleRemoveMember} 
				/>
            </div>
        </div>
    );

};

export default TeamMembersPage;
