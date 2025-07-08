import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RemoveMemberModal from "./RemoveMemberModal";
import { UserMinus, UserPlus, UserMinus2 } from "lucide-react";
import ChangeRoleModal from "./ChangeRoleModal";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function ActionMenu({ 
	isOpen, 
	onClose, 
	anchorEl, 
	member, 
	currentUser, 
	onRemoveMember 
}) {

	const { projectId } = useParams();

    const menuRef = useRef(null);
    const isAdmin = member.role === "admin";
    const isManager = member.role === "manager";
    const isSelf = member.id === currentUser;

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showRoleConfirmation, setShowRoleConfirmation] = useState(false);
    const [roleAction, setRoleAction] = useState(null);
	const [memberBeingRemoved, setMemberBeingRemoved] = useState(false);
	const [memberRoleBeingChanged, setMemberRoleBeingChanged] = useState(false);

    // Close menu when clicking outside
    useEffect(() => {

        function handleClickOutside(event) {

            if (
				menuRef.current 
				&& 
				!menuRef.current.contains(event.target) 
				&& 
				anchorEl 
				&& 
				!anchorEl.contains(event.target)
			) {
                onClose();
            }

        }

        function handleEscape(event) {

            if (event.key === "Escape") {
                onClose();
            }

        }

        if (isOpen) {

            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);

        }

        return () => {

            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);

        }

    }, [isOpen, onClose, anchorEl]);

    const handleRemoveClick = () => {

        setShowConfirmation(true)
        onClose();

    }

    async function removeMember(event) {

		event.stopPropagation();

		setMemberBeingRemoved(true);

		try {

			const res = await fetch(
				`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${member.id}`,
				{
					method: 'DELETE',
					credentials: 'include'
				}
			);

			if (!res.ok) {

				throw new Error('Error occured while deleting the user.');

			} else {

				if (onRemoveMember) {
					onRemoveMember(member.id);
				}

				setShowConfirmation(false);

			}

		} catch(error) {

			console.log("The following error occured while updating team member's role: " + error.message);

		} finally {

			setMemberBeingRemoved(false);

		}

    }

	function closeRemoveMemberModal(event) {

		setShowConfirmation(false);
		event.stopPropagation();

	}

    function handlePromoteToManager() {

        setRoleAction("promote");
        setShowRoleConfirmation(true);
        onClose();

    }

    function handleDemoteToMember() {

        setRoleAction("demote");
        setShowRoleConfirmation(true);
        onClose();

    }

    async function changeMemberRole(event) {

		event.stopPropagation();

		setMemberRoleBeingChanged(true);

		try {

			const res = await fetch(
				`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${member.id}`,
				{
					method: 'PATCH',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						newRole: (roleAction === 'promote' ? 'manager' : 'member')
					})
				}
			);

			if (!res.ok) {

				throw new Error("Error occured while changing member's role")

			} else {

				console.log('role updated');

			}

		} catch(error) {

			console.log("The following error occured while updating team member's role: " + error.message);

		} finally {

			setShowRoleConfirmation(false);
        	setRoleAction(null);

		}

    }

	function closeChangeRoleModal(event) {

		setShowRoleConfirmation(false);
        setRoleAction(null);

		event.stopPropagation();

	}

    if (!isOpen && !showConfirmation && !showRoleConfirmation) return null

    return (
        <>
            {isOpen && (
                <div
                    ref={menuRef}
                    className="fixed z-50 bg-white dark:bg-black shadow-lg rounded-md border border-gray-200 
					dark:border-neutral-700 max-w-60"
                    style={{
                        top: anchorEl ? anchorEl.getBoundingClientRect().top + window.scrollY + 40 : 0,
                        left: anchorEl ? anchorEl.getBoundingClientRect().left + window.scrollX - 180 : 0,
                    }}
                >
                    <div className="p-1.5 flex flex-col gap-y-1">
                        {
							!isAdmin && !isManager && (
								<button
									className="flex items-center w-full gap-y-2 px-4 py-2 text-base text-gray-700 
									dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-md 
									text-sm"
									onClick={handlePromoteToManager}
								>
									<UserPlus className="h-4 w-4 mr-2" />
									<span>Promote to Manager</span>
								</button>
                        	)
						}
                        {
							isManager && (
								<button
									className="flex items-center w-full px-4 py-2 text-base text-gray-700 dark:text-gray-200 
									hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-md text-sm"
									onClick={handleDemoteToMember}
								>
									<UserMinus2 className="h-4 w-4 mr-2" />
									<span>Demote to <span className="font-semibold">Member</span></span>
								</button>
                        	)
						}
                        {
							isAdmin && isSelf ? (
								<div className="flex items-center w-full px-4 py-2 text-base text-gray-400 dark:text-gray-200 
								border-gray-200 dark:border-gray-700 text-sm dark:hover:bg-neutral-900 rounded-md">
									<UserMinus className="h-4 w-4 mr-2" />
									<span>Cannot remove yourself</span>
								</div>
							) : (
								!isAdmin && (
									<button
										className="flex items-center w-full px-4 py-2 text-base text-red-500 
										hover:bg-gray-100 dark:hover:bg-neutral-900 border-gray-200 dark:border-gray-700
										text-sm rounded-md"
										onClick={handleRemoveClick}
									>
										<UserMinus className="h-4 w-4 mr-2" />
										<span>Remove from project</span>
									</button>
								)
							)
						}
                    </div>
                </div>
            )}
			{
				showConfirmation && (
					<RemoveMemberModal
						member={member}
						memberBeingRemoved={memberBeingRemoved}
						onConfirm={removeMember}
						onCancel={closeRemoveMemberModal}
					/>
				)
			}
			{
				showRoleConfirmation && (
					<ChangeRoleModal
						member={member}
						memberRoleBeingChanged={memberRoleBeingChanged}
						onConfirm={changeMemberRole}
						onCancel={closeChangeRoleModal}
						action={roleAction}
					/>
				)
			}
        </>
    )
}
