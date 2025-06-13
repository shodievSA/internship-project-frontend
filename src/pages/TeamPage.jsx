import { useState } from "react"
import { TeamMembersList } from "../components/team-members-list"
import { teamMembers as initialTeamMembers } from "../utils/data"
import { Toaster } from "react-hot-toast"
import { useOutletContext } from "react-router-dom"

export default function TeamMembersPage() {

    const { projectData } = useOutletContext();

    console.log(projectData);

    // For demo purposes, we'll assume the current user is the admin (John Doe)
    const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
    const [currentUser] = useState(teamMembers[0])

    const handleRemoveMember = (memberId) => {
        setTeamMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId))
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
            <div className="">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Team Members</h1>
                    <span className="text-gray-500 dark:text-gray-400">{teamMembers.length} members</span>
                </header>

                <TeamMembersList members={teamMembers} currentUser={currentUser} onRemoveMember={handleRemoveMember} />
            </div>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    className: "",
                    duration: 3000,
                    style: {
                        background: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                    },
                    success: {
                        iconTheme: {
                            primary: "#10B981",
                            secondary: "white",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#EF4444",
                            secondary: "white",
                        },
                    },
                }}
            />
        </div>
    )
}
