import { useRef, useEffect, useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useToast } from "./ui/ToastProvider";
import { useParams } from "react-router-dom";
import RemoveMemberModal from "./RemoveMemberModal";
import { UserMinus, UserPlus, UserMinus2 } from "lucide-react";
import ChangeRoleModal from "./ChangeRoleModal";
import projectService from "../services/projectService";

export function ActionMenu({ isOpen, onClose, anchorEl, selectedMember }) {
	const { currentMemberId, setTeam } = useProject();
	const { showToast } = useToast();
	const { projectId } = useParams();

	const menuRef = useRef(null);
	const isAdmin = selectedMember.role === "admin";
	const isManager = selectedMember.role === "manager";
	const isSelf = selectedMember.id === currentMemberId;

	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showRoleConfirmation, setShowRoleConfirmation] = useState(false);
	const [roleAction, setRoleAction] = useState(null);
	const [memberBeingRemoved, setMemberBeingRemoved] = useState(false);
	const [memberRoleBeingChanged, setMemberRoleBeingChanged] = useState(false);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				anchorEl &&
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
		};
	}, [isOpen, onClose, anchorEl]);

	function handleRemoveClick() {
		setShowConfirmation(true);
		onClose();
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
			const newRole = roleAction === "promote" ? "manager" : "member";

			const { updatedTeamMember } = await projectService.changeMemberRole(
				{
					projectId: projectId,
					memberId: selectedMember.id,
					newRole: newRole,
				},
			);

			setTeam((prevTeam) =>
				prevTeam.map((member) =>
					member.id === selectedMember.id
						? updatedTeamMember
						: member,
				),
			);

			setShowRoleConfirmation(false);

			showToast({
				variant: "success",
				title: "Member role updated successfully",
			});
		} catch (err) {
			showToast({
				variant: "failure",
				title: err.message,
			});
		} finally {
			setRoleAction(null);
			setMemberRoleBeingChanged(false);
		}
	}

	async function removeMember(event) {
		event.stopPropagation();
		setMemberBeingRemoved(true);

		try {
			await projectService.removeMember(projectId, selectedMember.id);

			setTeam((prevTeam) =>
				prevTeam.filter((member) => member.id !== selectedMember.id),
			);

			setShowConfirmation(false);

			showToast({
				variant: "success",
				title: "Member has been removed from the project successfully!",
			});
		} catch (err) {
			showToast({
				variant: "failure",
				title: err.message,
			});
		} finally {
			setMemberBeingRemoved(false);
		}
	}

	function closeChangeRoleModal(event) {
		setShowRoleConfirmation(false);
		setRoleAction(null);

		event.stopPropagation();
	}

	if (!isOpen && !showConfirmation && !showRoleConfirmation) return null;

	return (
		<>
			{isOpen && (
				<div
					ref={menuRef}
					className="fixed z-50 bg-white dark:bg-black shadow-lg rounded-md border border-gray-200 
						dark:border-neutral-700 max-w-60"
					style={{
						top: anchorEl
							? anchorEl.getBoundingClientRect().top +
								window.scrollY +
								40
							: 0,
						left: anchorEl
							? anchorEl.getBoundingClientRect().left +
								window.scrollX -
								180
							: 0,
					}}
				>
					<div className="p-1.5 flex flex-col gap-y-1">
						{!isAdmin && !isManager && (
							<button
								className="flex items-center w-full gap-y-2 px-4 py-2 text-base text-gray-700 
										dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-md 
										text-sm"
								onClick={handlePromoteToManager}
							>
								<UserPlus className="h-4 w-4 mr-2" />
								<span>Promote to Manager</span>
							</button>
						)}
						{isManager && (
							<button
								className="flex items-center w-full px-4 py-2 text-base text-gray-700 dark:text-gray-200 
										hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-md text-sm"
								onClick={handleDemoteToMember}
							>
								<UserMinus2 className="h-4 w-4 mr-2" />
								<span>
									Demote to{" "}
									<span className="font-semibold">
										Member
									</span>
								</span>
							</button>
						)}
						{isAdmin && isSelf ? (
							<div
								className="flex items-center w-full px-4 py-2 text-base text-gray-400 dark:text-gray-200 
									border-gray-200 dark:border-gray-700 text-sm dark:hover:bg-neutral-900 rounded-md"
							>
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
						)}
					</div>
				</div>
			)}
			{showConfirmation && (
				<RemoveMemberModal
					member={selectedMember}
					memberBeingRemoved={memberBeingRemoved}
					onConfirm={removeMember}
					onCancel={closeRemoveMemberModal}
				/>
			)}
			{showRoleConfirmation && (
				<ChangeRoleModal
					member={selectedMember}
					memberRoleBeingChanged={memberRoleBeingChanged}
					onConfirm={changeMemberRole}
					onCancel={closeChangeRoleModal}
					action={roleAction}
				/>
			)}
		</>
	);
}
