import { useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Mail, MoreVertical, User } from "lucide-react"
import { StatusBadge } from "./status-badge"
import { ActionMenu } from "./action-menu"
import { getAvatarUrl } from "../utils/constant"

export function TeamMemberCard({ member, currentUser, onRemoveMember }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const buttonRef = useRef(null)
    const navigate = useNavigate()
    const { projectId } = useParams()

    const handleMenuToggle = (e) => {
        e.stopPropagation()
        setMenuOpen(!menuOpen)
    }

    const handleCardClick = () => {
        if (!menuOpen) {
            navigate(`/projects/${projectId}/team/${member.id}`, {
                state: {
                    projectInfo: {
                        id: projectId,
                        name: member.projectName || "Project Name",
                        status: "active"
                    }
                }
            })
        }
    }

    return (
        <div
            onClick={handleCardClick}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-black relative transition-all duration-200 ease-in-out hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 group cursor-pointer"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start flex-grow min-w-0">
                    <div className="flex-shrink-0 mr-3">
                        <img
                            src={getAvatarUrl(member.name)}
                            alt={member.name}
                            width={48}
                            height={48}
                            className="rounded-full bg-gray-100 dark:bg-gray-800 object-cover"
                        />
                    </div>

                    <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg truncate">{member.name}</h3>
                            <StatusBadge status={member.status} />
                        </div>

                        <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <User className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="truncate">{member.role}</span>
                            </div>

                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="truncate">{member.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    ref={buttonRef}
                    className="flex-shrink-0 ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    onClick={handleMenuToggle}
                    aria-label="Member options"
                    aria-expanded={menuOpen}
                    aria-haspopup="true"
                >
                    <MoreVertical className="h-5 w-5" />
                </button>
            </div>

            <ActionMenu
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                anchorEl={buttonRef.current}
                member={member}
                currentUser={currentUser}
                onRemoveMember={onRemoveMember}
            />
        </div>
    )
}