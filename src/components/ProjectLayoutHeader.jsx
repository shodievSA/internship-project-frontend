import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { statusColors } from "../utils/constant";
import { Users, UserPlus, TrendingUp } from "lucide-react";
import ProjectActions from "./ProjectActions";

function ProjectLayoutHeader() {

	const { 
		metaData, 
		setMetaData, 
		currentMemberId, 
		currentMemberRole 
	} = useProject();

	const navigate = useNavigate();

	return (
		<>
			<div className="flex justify-between items-center gap-y-6 gap-x-6">
				<div className="flex items-center gap-x-8">
					<div className="flex items-center justify-between md:justify-start gap-x-4">
						<h1 className="text-lg font-medium">{metaData.title}</h1>
						<div className={`${statusColors[metaData.status]} status-badge 
						px-3 py-1 text-xs`}>
							{metaData.status}
						</div>
					</div>
					<div className="flex text-sm gap-x-5">
						<div 
							className="flex items-center gap-x-2 dark:hover:bg-neutral-900 
							hover:bg-slate-100 px-4 py-1.5 cursor-pointer rounded-md border 
							border-slate-200 dark:border-neutral-800"
							onClick={() => navigate("summary")}
						>
							<TrendingUp className="w-3.5 h-3.5" />
							<span>Analytics</span>
						</div>
						<div
							className="flex items-center gap-x-2 dark:hover:bg-neutral-900 
							hover:bg-slate-100 px-4 py-1.5 cursor-pointer rounded-md border 
							border-slate-200 dark:border-neutral-800"
							onClick={() => navigate("team")}
						>
							<Users className="w-3.5 h-3.5" />
							<span>Team</span>
						</div>
						{ currentMemberRole === "admin" && (
							<div
								className="flex items-center gap-x-2 dark:hover:bg-neutral-900 
								hover:bg-slate-100 px-4 py-1.5 cursor-pointer rounded-md border 
								border-slate-200 dark:border-neutral-800"
								onClick={() => navigate("invites")}
							>
								<UserPlus className="w-3.5 h-3.5" />
								<span>Invites</span>
							</div>
						)}
					</div>
				</div>
				<ProjectActions
					currentMemberId={currentMemberId}
					currentMemberRole={currentMemberRole} 
					metaData={metaData}
					setMetaData={setMetaData}
				/>
			</div>
		</>
	);
}

export default ProjectLayoutHeader;
