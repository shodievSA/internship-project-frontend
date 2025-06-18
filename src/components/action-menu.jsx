import { useRef, useEffect, useState } from "react"
import { Shield, UserMinus, UserPlus, UserMinus2 } from "lucide-react"
import { ModalOverlay } from "./modal-overlay"
import { ConfirmationDialog } from "./confirmation-dialog"
import { RoleConfirmationDialog } from "./RoleConfirmationDialog"

export function ActionMenu({ isOpen, onClose, anchorEl, member, currentUser, onRemoveMember }) {
    const menuRef = useRef(null)
    const isAdmin = member.status === "admin"
    const isManager = member.status === "manager"
    const isSelf = member.id === currentUser?.id
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showRoleConfirmation, setShowRoleConfirmation] = useState(false)
    const [roleAction, setRoleAction] = useState(null)

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target) && anchorEl && !anchorEl.contains(event.target)) {
                onClose()
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
            document.addEventListener("keydown", handleEscape)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose, anchorEl])

    const handleRemoveClick = () => {
        setShowConfirmation(true)
        onClose() // Close the menu
    }

    const handleConfirmRemove = () => {
        console.log("Confirmed: Remove from project:", member.name)
        if (onRemoveMember) {
            onRemoveMember(member.id)
        }
        setShowConfirmation(false)
    }

    const handleCancelRemove = () => {
        setShowConfirmation(false)
    }

    const handlePromoteToManager = () => {
        setRoleAction("promote")
        setShowRoleConfirmation(true)
        onClose()
    }

    const handleDemoteToMember = () => {
        setRoleAction("demote")
        setShowRoleConfirmation(true)
        onClose()
    }

    const handleConfirmRoleChange = () => {
        console.log(`Confirmed: ${roleAction} ${member.name}`)
        // Here you would typically call an API to update the member's role
        setShowRoleConfirmation(false)
        setRoleAction(null)
    }

    const handleCancelRoleChange = () => {
        setShowRoleConfirmation(false)
        setRoleAction(null)
    }

    if (!isOpen && !showConfirmation && !showRoleConfirmation) return null

    return (
        <>
            {isOpen && (
                <div
                    ref={menuRef}
                    className="fixed z-50 bg-white dark:bg-gray-900 shadow-lg rounded-md border border-gray-200 dark:border-gray-800 w-56"
                    style={{
                        top: anchorEl ? anchorEl.getBoundingClientRect().top + window.scrollY + 40 : 0,
                        left: anchorEl ? anchorEl.getBoundingClientRect().left + window.scrollX - 180 : 0,
                    }}
                >
                    <div className="py-1">
                        {!isAdmin && !isManager && (
                            <button
                                className="flex items-center w-full px-4 py-2 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={handlePromoteToManager}
                            >
                                <UserPlus className="h-4 w-4 mr-2" />
                                Promote to Manager
                            </button>
                        )}

                        {isManager && (
                            <button
                                className="flex items-center w-full px-4 py-2 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={handleDemoteToMember}
                            >
                                <UserMinus2 className="h-4 w-4 mr-2" />
                                Demote to Member
                            </button>
                        )}

                        {isAdmin && isSelf ? (
                            <div className="flex items-center w-full px-4 py-2 text-base text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700">
                                <UserMinus className="h-4 w-4 mr-2" />
                                Cannot remove yourself
                            </div>
                        ) : (
                            !isAdmin && (
                                <button
                                    className="flex items-center w-full px-4 py-2 text-base text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                                    onClick={handleRemoveClick}
                                >
                                    <UserMinus className="h-4 w-4 mr-2" />
                                    Remove from Project
                                </button>
                            )
                        )}
                    </div>
                </div>
            )}

            <ModalOverlay isOpen={showConfirmation} onClose={handleCancelRemove}>
                <ConfirmationDialog member={member} onConfirm={handleConfirmRemove} onCancel={handleCancelRemove} />
            </ModalOverlay>

            <ModalOverlay isOpen={showRoleConfirmation} onClose={handleCancelRoleChange}>
                <RoleConfirmationDialog
                    member={member}
                    action={roleAction}
                    onConfirm={handleConfirmRoleChange}
                    onCancel={handleCancelRoleChange}
                />
            </ModalOverlay>
        </>
    )
}
