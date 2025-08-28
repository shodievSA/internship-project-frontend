import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Filter, UserPlus } from "lucide-react";
import { CustomDropdown } from "../components/CustomDropdown";
import { statusOptionsInviation } from "../utils/constant";
import { ProjectInvitationCard } from "../components/ProjectInvitationCard";
import Button from "../components/ui/Button";
import SearchBar from "../components/SearchBar";
import SendInviteModal from "../components/SendInviteModal";
import EmptyProjectInvites from "../components/EmptyProjectInvites";
import teamMemberService from "../services/teamMemberService";
import { ArrowLeft } from "lucide-react";
import EmptySearch from "../components/EmptySearch";
import LoadingState from "../components/LoadingState";

function ProjectInvitesPage() {
	const { projectId } = useParams();
	const navigate = useNavigate();

	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateFilter, setDateFilter] = useState("all");
	const [showInviteModal, setShowInviteModal] = useState(false);
	const [projectInvites, setProjectInvites] = useState([]);
	const [projectInvitesLoaded, setProjectInvitesLoaded] = useState(false);
	const [error, setError] = useState();

	function openModal() {
		setShowInviteModal(true);
	}

	function closeModal() {
		setShowInviteModal(false);
	}

	function handleNewInvite(newInvite) {
		setProjectInvites((prevInvites) => {
			return [newInvite, ...prevInvites];
		});
	}

	const filteredInvites = useMemo(() => {
		if (!projectInvitesLoaded || !projectInvites) return [];

		return projectInvites.filter((invite) => {
			const matchesSearch =
				invite.receiverName
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				invite.receiverEmail
					.toLowerCase()
					.includes(searchTerm.toLowerCase());

			const matchesStatus =
				statusFilter === "all" || invite.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [projectInvitesLoaded, projectInvites, statusFilter, searchTerm]);

	function clearFilters() {
		setSearchTerm("");
		setStatusFilter("all");
		setDateFilter("all");
	}

	useEffect(() => {
		async function getProjectInvites() {
			try {
				const { projectInvites } =
					await teamMemberService.getProjectInvites(projectId);
				setProjectInvites(projectInvites);
			} catch (err) {
				setError(err.message);
			} finally {
				setTimeout(() => {
					setProjectInvitesLoaded(true);
				}, 500);
			}
		}

		getProjectInvites();
	}, [projectId]);

	if (!projectInvitesLoaded)
		return <LoadingState message={"Fetching your project invites!"} />;
	if (showInviteModal)
		return (
			<SendInviteModal
				closeModal={closeModal}
				onNewInviteCreated={handleNewInvite}
			/>
		);
	if (projectInvites.length === 0)
		return <EmptyProjectInvites openModal={openModal} />;

	return (
		<div className="flex flex-col gap-y-6 h-full px-8 py-6">
			<div className="flex flex-col gap-y-6 items-stretch gap-4">
				<div className="flex justify-between">
					<div className="flex gap-x-6 items-center">
						<Button
							variant="secondary"
							size="sm"
							onClick={() => navigate(-1)}
						>
							<div className="flex items-center gap-x-3">
								<ArrowLeft className="w-4 h-4" />
								<span>Back to project</span>
							</div>
						</Button>
						<div>
							<h1 className="text-xl font-semibold">
								Project Invites
							</h1>
						</div>
					</div>
					<span>{filteredInvites.length} invites</span>
				</div>
				<div className="flex flex-col justify-between sm:flex-row gap-3 items-stretch sm:items-center">
					<div className="flex justify-start w-[400px]">
						<div className="relative w-full">
							<SearchBar
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search by project, inviter name or email..."
							/>
						</div>
					</div>
					<div className="flex items-center gap-x-5">
						<div className="flex flex-col sm:flex-row gap-3">
							<CustomDropdown
								value={statusFilter}
								onChange={setStatusFilter}
								options={statusOptionsInviation}
								placeholder="All Status"
								icon={Filter}
								className="w-full sm:w-auto"
							/>
						</div>
						<Button
							variant="secondary"
							size="sm"
							className="flex items-center gap-x-2"
							onClick={() => setShowInviteModal(true)}
						>
							<UserPlus className="h-4 w-4" />
							<span>Send Invite</span>
						</Button>
					</div>
				</div>
			</div>
			{filteredInvites.length > 0 ? (
				<div className="flex flex-col gap-y-5 pb-10">
					{filteredInvites.map((invite) => (
						<ProjectInvitationCard
							key={invite.id}
							invite={invite}
						/>
					))}
				</div>
			) : (
				<EmptySearch onClearFilters={clearFilters} />
			)}
		</div>
	);
}

export default ProjectInvitesPage;
