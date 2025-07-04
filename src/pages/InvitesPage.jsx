import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar, Filter, UserPlus, Inbox } from "lucide-react";
import { CustomDropdown } from "../components/CustomDropdown";
import { statusOptionsInviation, dateOptions } from "../utils/constant";
import { ProjectInvitationCard } from "../components/ProjectInvitationCard";
import { EmptyInvitation } from "../components/EmptyInvitation";
import Button from "../components/ui/Button";
import SearchBar from "../components/SearchBar";
import SendInviteModal from "../components/SendInviteModal";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";

function InvitesPage() {

	const { project, setProject, projectLoaded } = useOutletContext();

	const [filteredInvites, setFilteredInvites] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateFilter, setDateFilter] = useState("all");
	const [showInviteModal, setShowInviteModal] = useState(false);

	function closeModal() {
		setShowInviteModal(false);
	}

	useEffect(() => {

		if (projectLoaded && project !== null) {

			setFilteredInvites(() => {

				return project.invites.filter((invite) => {

					const matchesSearch =
					invite.receiverName?.toLowerCase().includes(searchTerm.toLowerCase()) 
					||
					invite.receiverEmail.toLowerCase().includes(searchTerm.toLowerCase());

					const matchesStatus = statusFilter === "all" || invite.status === statusFilter;

					return matchesSearch && matchesStatus;
	
				});

			})

		}

	}, [
		projectLoaded, 
		project, 
		statusFilter, 
		dateFilter, 
		searchTerm
	   ]
	);

	return (
		<div className="h-full">
			{
				!projectLoaded ? (
					<LoadingState message={"Hang tight - fetching your project invites!"} />
				) : !project ? (
					<ErrorState message={"Your project invites are being a little shy… try refreshing."} />
				) : project.invites.length === 0 ? (
					<div className="h-full flex flex-col gap-y-5 justify-center items-center">
						<Inbox className="w-16 h-16" />
						<div className="flex items-center flex-col gap-y-5">
							<h1 className="text-xl">
								No invites yet... but the party’s just getting started
							</h1>
							<Button
								size="lg"
								className="flex items-center gap-x-3 w-max"
								onClick={() => setShowInviteModal(true)}
							>
								<UserPlus className="h-5 w-5" />
								<span className="font-medium text-lg">Send Your First Invite</span>
							</Button>
						</div>
					</div>
				) : (
					<div className="bg-white dark:bg-black text-gray-900 dark:text-white">
						<div>
							<div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-6">
								<div className="flex justify-start w-full lg:w-1/3">
									<div className="relative w-full">
										<SearchBar
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											placeholder="Search by project, inviter name or email..."
										/>
									</div>
								</div>
								<div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
									<div className="flex flex-col sm:flex-row gap-3">
									<CustomDropdown
										value={statusFilter}
										onChange={setStatusFilter}
										options={statusOptionsInviation}
										placeholder="All Status"
										icon={Filter}
										className="w-full sm:w-auto"
									/>
									<CustomDropdown
										value={dateFilter}
										onChange={setDateFilter}
										options={dateOptions}
										placeholder="All Dates"
										icon={Calendar}
										className="w-full sm:w-auto"
									/>
									</div>
									<Button
										variant="secondary"
										size="md"
										className='flex items-center gap-x-2'
										onClick={() => setShowInviteModal(true)}
									>
										<UserPlus className="h-4 w-4" />
										<span className="font-medium">Send Invite</span>
									</Button>
								</div>
							</div>
							<div className="flex flex-col gap-y-5 pb-10">
								{
									filteredInvites.length > 0 ? (
										filteredInvites.map((invite) => (
											<ProjectInvitationCard 
												key={invite.id} 
												invite={invite} 
											/>
										))
									) : (
										<EmptyInvitation />
									)
								}
							</div>
						</div>
					</div>
				)
			}
			{
				showInviteModal && (
					<SendInviteModal 
						closeModal={closeModal} 
						onNewInviteCreated={(newInvite) => setProject((prevProject) => {
							return {
								...prevProject,
								invites: [newInvite, ...prevProject.invites]
							}
						})}
					/>
				)
			}
		</div>
	);

}

export default InvitesPage;
