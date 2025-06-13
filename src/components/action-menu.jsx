

import { useRef, useEffect, useState } from "react"
import { Shield, BarChart2, UserMinus } from "lucide-react"
import { ModalOverlay } from "./modal-overlay"
import { ConfirmationDialog } from "./confirmation-dialog"
import toast from "react-hot-toast"

export function ActionMenu({ isOpen, onClose, anchorEl, member, currentUser, onRemoveMember }) {
    const menuRef = useRef(null)
    const isAdmin = member.status === "admin"
    const isSelf = member.id === currentUser?.id
    const [showConfirmation, setShowConfirmation] = useState(false)

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
            toast.success(`${member.name} has been removed from the project`)
        }
        setShowConfirmation(false)
    }

    const handleCancelRemove = () => {
        setShowConfirmation(false)
    }

    const handlePromoteToAdmin = () => {
        console.log("Promote to admin:", member.name)
        toast.success(`${member.name} has been promoted to admin`)
        onClose()
    }

    if (!isOpen && !showConfirmation) return null

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
                        <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => {
                                console.log("View analytics for", member.name)
                                onClose()
                            }}
                        >
                            <BarChart2 className="h-4 w-4 mr-2" />
                            View Analytics
                        </button>

                        {!isAdmin && (
                            <button
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                                onClick={handlePromoteToAdmin}
                            >
                                <Shield className="h-4 w-4 mr-2" />
                                Promote to Admin
                            </button>
                        )}

                        {isAdmin && isSelf ? (
                            <div className="flex items-center w-full px-4 py-2 text-sm text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700">
                                <UserMinus className="h-4 w-4 mr-2" />
                                Cannot remove yourself
                            </div>
                        ) : (
                            !isAdmin && (
                                <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
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
        </>
    )
}
