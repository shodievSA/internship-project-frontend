import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { TriangleAlert } from "lucide-react";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function DeleteProjectModal({ projectId, projectTitle, showModal }) {

	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
	const [projectBeingDeleted, setProjectBeingDeleted] = useState(false);
	const [projectName, setProjectName] = useState('');

	const navigate = useNavigate();

	const deleteWarnings = [
		"Delete all project data and files",
		"Remove all tasks and assignments",
		"Delete all project communications",
		"Remove team member access",
		"This action cannot be undone"
	];

	useEffect(() => {
		
		setSubmitButtonDisabled(projectName !== projectTitle);
		
	}, [projectName, projectTitle]);

	async function deleteProject() {

		setProjectBeingDeleted(true);

		try {

			const res = await fetch(`${SERVER_BASE_URL}/api/v1/projects/${projectId}`, {
				method: 'DELETE',
				credentials: 'include'
			});

			if (res.ok) {
				navigate('/projects', { replace: true });
			} else {
				throw new Error('Error occured while deleting the project.');
			}

		} catch(err) {

			console.log(err);

		} finally {

			setProjectBeingDeleted(false);

		}

	}

	return (
		<Modal 
			title="Delete Project" 
			titleIcon={<TriangleAlert className="text-red-700 w-6 h-6" />}
			subtitle={`Are you sure you want to delete "${projectTitle}"?`}
			size="md"
		>
			<div className="flex flex-col px-7 pb-7 gap-y-8">
				<div className="dark:bg-red-950 dark:border-red-800 bg-red-100 border-red-300 
				text-red-500 flex flex-col gap-y-2 p-4 rounded-md border-[1px]">
					<span>This action will permanently:</span>
					<ul className="list-disc pl-5">
						{
							deleteWarnings.map((warning) => {
								return (
									<li className="mt-1">{ warning }</li>
								)
							})
						}
					</ul>
				</div>
				<div className="flex flex-col gap-y-3">
					<label className="dark:text-neutral-400 text-slate-500">
						Type <span className="font-bold">{ projectTitle }</span> to confirm:
					</label>
					<Input
						disabled={projectBeingDeleted}
						placeholder={projectTitle}
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Button 
						disabled={projectBeingDeleted}
						variant="secondary"
						onClick={() => showModal(false)}
					>
						Cancel
					</Button>
					<Button 
						variant="destructive"
						disabled={submitButtonDisabled}
						onClick={deleteProject}
						loading={projectBeingDeleted}
					>
						Delete Project
					</Button>
				</div>
			</div>
		</Modal>
	);

}

export default DeleteProjectModal;