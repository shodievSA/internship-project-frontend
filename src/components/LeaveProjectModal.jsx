import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/ToastProvider";
import teamMemberService from "../services/teamMemberService";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { UserMinus } from "lucide-react";

const leaveWarnings = [
	"Remove your access to this project",
	"Unassign you from all tasks",
	"Remove you from project communications",
	"Remove team member access",
	"You'll need to be re-invited to rejoin",
];

function LeaveProjectModal({
	projectId,
	projectTitle,
	onProjectLeave,
	closeModal,
}) {
	const { showToast } = useToast();

	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
	const [leavingProject, setLeavingProject] = useState(false);
	const [projectName, setProjectName] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		setSubmitButtonDisabled(projectName !== projectTitle);
	}, [projectName, projectTitle]);

	async function leaveProject() {
		setLeavingProject(true);

		try {
			await teamMemberService.leaveProject(projectId);

			onProjectLeave(projectId);

			navigate("/projects", { replace: true });

			showToast({
				variant: "success",
				title: "You've left the project successfully!",
			});
		} catch (err) {
			showToast({
				variant: "failure",
				title: err.message,
			});
		} finally {
			setLeavingProject(false);
		}
	}

	return (
		<Modal
			title="Leave Project"
			titleIcon={<UserMinus className="text-orange-700 w-5 h-5" />}
			subtitle={`Are you sure you want to leave "${projectTitle}"?`}
			size="md"
			closeModal={closeModal}
		>
			<div className="flex flex-col px-7 pb-7 gap-y-8">
				<div
					className="dark:bg-orange-950 dark:border-orange-800 bg-orange-100 border-orange-300 
				text-orange-500 flex flex-col gap-y-2 p-4 rounded-md border-[1px]"
				>
					<span>This action will permanently:</span>
					<ul className="list-disc pl-5">
						{leaveWarnings.map((warning) => {
							return <li className="mt-1">{warning}</li>;
						})}
					</ul>
				</div>
				<div className="flex flex-col gap-y-3">
					<label className="dark:text-neutral-400 text-slate-500">
						Type <span className="font-bold">{projectTitle}</span>{" "}
						to confirm:
					</label>
					<Input
						disabled={leavingProject}
						placeholder={projectTitle}
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Button
						size="md"
						disabled={leavingProject}
						variant="secondary"
						onClick={closeModal}
					>
						Cancel
					</Button>
					<Button
						size="md"
						variant="alert"
						disabled={submitButtonDisabled}
						onClick={leaveProject}
						loading={leavingProject}
					>
						Leave Project
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default LeaveProjectModal;
