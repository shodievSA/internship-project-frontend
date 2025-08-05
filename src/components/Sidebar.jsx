import { useState, useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationsContext";
import { useProjectsContext } from "../context/ProjectsContext";
import userService from "../services/userService";
import { NavLink } from "react-router-dom";
import {
	House,
	Sparkles,
	Bell,
	LogOut,
	MailPlus,
	SquarePlus,
} from "lucide-react";

function Sidebar({ sidebarCollapsed, setSidebarCollapsed }) {

	const { user, setUser } = useAuthContext();
	const { loading, error, notifications, invitesFetched, invites } = useNotifications();
	const {
		projectsLoaded,
		projects,
		setShowNewProjectModal,
		userProjectCount,
	} = useProjectsContext();

	const [signoutButtonClicked, setSignoutButtonClicked] = useState(false);
	const [isUserBeingSignedOut, setIsUserBeingSignedOut] = useState(false);

	const unviewedNotifications = useMemo(() => {

		if (loading || error) return [];

		return notifications.filter((notification) => !notification.isViewed);

	}, [loading, error, notifications]);

	const pendingInvites = useMemo(() => {

		if (!invitesFetched) return [];

		return invites.filter((invite) => invite.status === "pending");

	}, [invitesFetched, invites]);

	async function logOutUser() {

		setIsUserBeingSignedOut(true);

		try {

			await userService.logOut();
			setUser(null);

		} catch {

			console.log("Error occured while logging out the user.");

		} finally {

			setIsUserBeingSignedOut(false);
			
		}

	}

	return (
		<>
			<div>
				<div
					className={`${sidebarCollapsed ? "bg-transparent pointer-events-none" : "bg-black/30"} 
                fixed h-full w-full transition-bg-color duration-200 z-10 lg:hidden`}
				></div>{" "}
				{/* dark, semi-transparent background color only for mobile and tablet screen sizes */}
				<div className={`${sidebarCollapsed
					? "w-0 lg:w-0 lg:pl-3 -translate-x-72 lg:-translate-x-64"
					: "w-full lg:pl-0 lg:w-64"
				} dark:text-white flex fixed lg:static h-full z-20 transition-all duration-500`}>
					<div className={`dark:bg-[rgb(12,12,12)] bg-neutral-100 w-72 lg:grow`}>
						<div className={`flex flex-col h-full pt-4 gap-y-8`}>
							<div className="flex gap-x-3 items-center justify-start px-2">
								<div className="bg-neutral-200 w-10 h-10 rounded-full flex-shrink-0">
									<img
										src={user.avatarUrl}
										className="w-full h-full rounded-full"
									/>
								</div>
								<div className="flex flex-col">
									<p className="text-sm font-medium">
										{user.fullName}
									</p>
									<p className="dark:text-neutral-400 text-neutral-500 text-sm truncate">
										{user.email}
									</p>
								</div>
							</div>
							<div className="flex flex-col grow">
								<div className="flex flex-col gap-y-2 border-b dark:border-b-neutral-800 pb-3">
									<h4 className="dark:text-neutral-400 text-neutral-500 text-xs px-3 
									font-semibold px-1">
										MAIN MENU
									</h4>
									<ul className="flex flex-col gap-y-1 font-medium text-sm px-2">
										<NavLink
											to={"/projects"}
											className={({ isActive }) => `hover:dark:bg-violet-900/30 hover:bg-indigo-100 
											dark:text-neutral-400 hover:dark:text-violet-300 hover:text-indigo-600 flex items-center gap-x-3 
											py-2 px-3 rounded-md transition-[border] duration-300 border-2 ${ isActive
												? "border-2 bg-indigo-100 border-indigo-200 dark:bg-violet-900/30 dark:border-violet-900/50 text-indigo-600 dark:text-violet-300"
												: "bg-neutral-100 dark:bg-[rgb(12,12,12)] border-neutral-100 dark:border-[rgb(12,12,12)] text-neutral-600"
											}`}
										>
											<House className="w-5 h-5" />
											<span>Dashboard</span>
										</NavLink>
										<NavLink
											to={"/organizer"}
											className={({ isActive }) => `hover:dark:bg-violet-900/30 hover:bg-indigo-100
											dark:text-neutral-400 hover:dark:text-violet-300 hover:text-indigo-600 flex items-center gap-x-3 
											py-2 px-3 rounded-md transition-[all] duration-300 border-2 ${isActive
												? "border-2 bg-indigo-100 border-indigo-200 dark:bg-violet-900/30 dark:border-violet-900/50 text-indigo-600 dark:text-violet-300"
												: "bg-neutral-100 dark:bg-[rgb(12,12,12)] border-neutral-100 dark:border-[rgb(12,12,12)] text-neutral-600"
											}`}
										>
											<Sparkles className="w-5 h-5" />
											<span>Organizer</span>
										</NavLink>
										<NavLink
											to={"/notifications"}
											className={({ isActive }) => `hover:dark:bg-violet-900/30 hover:bg-indigo-100 
											dark:text-neutral-400 hover:dark:text-violet-300 hover:text-indigo-600 flex items-center gap-x-3 
											py-2 px-3 rounded-md transition-[all] duration-300 border-2 ${isActive
												? "border-2 bg-indigo-100 border-indigo-200 dark:bg-violet-900/30 dark:border-violet-900/50 text-indigo-600 dark:text-violet-300"
												: "bg-neutral-100 dark:bg-[rgb(12,12,12)] border-neutral-100 dark:border-[rgb(12,12,12)] text-neutral-600"
											}`}
										>
											<div className="flex items-center gap-x-3">
												<Bell className="w-5 h-5" />
												<span>Notifications</span>
											</div>
											{unviewedNotifications.length > 0 && (
												<div className="flex items-center gap-x-4">
													<span
														className="flex items-center justify-center text-[10px] bg-red-500 
													rounded-full text-white w-5 h-5"
													>
														{unviewedNotifications.length >
														99
															? "99+"
															: unviewedNotifications.length}
													</span>
													<span className="relative flex h-3 w-3">
														<span
															className="animate-ping absolute inline-flex h-full w-full rounded-full 
														bg-sky-400 opacity-75"
														></span>
														<span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
													</span>
												</div>
											)}
										</NavLink>
										<NavLink
											to={"/invites"}
											className={({ isActive }) => `hover:dark:bg-violet-900/30 hover:bg-indigo-100 
											dark:text-neutral-400 hover:dark:text-violet-300 hover:text-indigo-600 flex items-center gap-x-3 
											py-2 px-3 rounded-md transition-[all] duration-300 border-2 ${isActive
												? "border-2 bg-indigo-100 border-indigo-200 dark:bg-violet-900/30 dark:border-violet-900/50 text-indigo-600 dark:text-violet-300"
												: "bg-neutral-100 dark:bg-[rgb(12,12,12)] border-neutral-100 dark:border-[rgb(12,12,12)] text-neutral-600"
											}`}
										>
											<div className="flex items-center gap-x-3">
												<MailPlus className="w-5 h-5" />
												<span>Invites</span>
											</div>
											{pendingInvites.length > 0 && (
												<div className="flex items-center gap-x-4">
													<span className="flex items-center justify-center text-[10px] bg-red-500 
													rounded-full text-white w-5 h-5">
														{ pendingInvites.length > 99 ? "99+" : pendingInvites.length }
													</span>
													<span className="relative flex h-3 w-3">
														<span className="animate-ping absolute inline-flex h-full w-full rounded-full 
														bg-sky-400 opacity-75"
														></span>
														<span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
													</span>
												</div>
											)}
										</NavLink>
									</ul>
								</div>
								<div className="grow flex flex-col gap-y-2 pt-3 overflow-y-auto">
									<div className="flex items-center justify-between gap-x-5">
										<h4 className="dark:text-neutral-400 text-neutral-500 text-xs px-3 font-semibold px-1">
											MY PROJECTS
										</h4>
										<button
											disabled={!projectsLoaded}
											className="p-1.5 cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-900
											rounded-lg mr-5 disabled:opacity-50 disabled:pointer-events-none"
											onClick={() => setShowNewProjectModal(true)}
										>
											<SquarePlus className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
										</button>
									</div>
									{projectsLoaded ? (
										<ul className="grow overflow-y-auto flex flex-col gap-y-1 font-medium text-sm px-3">
											{projects.map((project) => (
												<NavLink
													key={project.id}
													to={`projects/${project.id}/my-tasks`}
													className="px-3 py-2 dark:hover:bg-neutral-900 dark:text-neutral-300 truncate
													dark:hover:text-white hover:bg-[rgb(235,235,235)] text-neutral-600 hover:text-black flex 
													items-center gap-x-3 rounded-md transition-[background-color] duration-200"
												>
													{project.title}
												</NavLink>
											))}
										</ul>
									) : (
										<div className="grow overflow-y-auto flex flex-col gap-y-1 font-medium 
										text-sm px-3">
											{Array.from(
												{ length: userProjectCount },
												(_, i) => {
													return (
														<div
															key={i}
															className="px-3 py-2 flex items-center gap-x-3 rounded-md
														bg-slate-300 dark:bg-neutral-800 animate-pulse"
														>
															<span className="invisible">
																Project Title
															</span>
														</div>
													);
												},
											)}
										</div>
									)}
								</div>
							</div>
							<div className="flex flex-col gap-y-5 p-4">
								<button
									className="dark:bg-black dark:hover:bg-neutral-950 dark:border-neutral-800 
									dark:text-neutral-300 dark:hover:text-white bg-white hover:bg-neutral-100 border-neutral-200
									text-neutral-600 hover:text-black flex items-center justify-left w-full py-2 px-3 rounded-md 
									gap-x-3 border-[1px] text-sm"
									onClick={() =>
										setSignoutButtonClicked(true)
									}
								>
									<LogOut className="w-4 h-4" />
									<span className="font-medium">
										Sign Out
									</span>
								</button>
								<p className="text-sm text-neutral-500">
									SmartDesk v1.0
								</p>
							</div>
						</div>
					</div>
					<div
						className="grow lg:hidden"
						onClick={() => setSidebarCollapsed(true)}
					></div>
				</div>
			</div>
			{signoutButtonClicked && (
				<div className="flex items-center justify-center fixed w-full h-full bg-black/80 z-30">
					<div
						className="dark:bg-neutral-950 dark:border-neutral-800 bg-white  
                        border-[1px] p-6 rounded-lg flex flex-col gap-y-3 w-[350px] lg:w-[500px]"
					>
						<h1 className="dark:text-white text-black text-lg lg:text-xl font-semibold">
							Sign Out
						</h1>
						<p className="dark:text-neutral-400 text-neutral-500 text-sm lg:text-base">
							Are you sure you want to sign out? You will need to
							log in again to access your workspace.
						</p>
						<div className="flex justify-end gap-x-4 mt-2">
							<button
								disabled={isUserBeingSignedOut}
								className={`dark:bg-neutral-950 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800 
                                    bg-white hover:bg-slate-100 py-2.5 px-4 border-[1px] rounded-md font-medium text-sm lg:text-base 
                                    ${isUserBeingSignedOut ? "cursor-not-allowed" : "cursor-pointer"} disabled:opacity-50`}
								onClick={() => setSignoutButtonClicked(false)}
							>
								Cancel
							</button>
							<button
								disabled={isUserBeingSignedOut}
								className="dark:bg-white dark:hover:bg-slate-200 dark:text-black bg-neutral-900 
                                    hover:bg-neutral-900/90 text-white py-2.5 px-4 rounded-md font-medium text-sm 
                                    lg:text-base disabled:opacity-50"
								onClick={logOutUser}
							>
								{isUserBeingSignedOut ? (
									<div className="flex justify-center">
										<div className="relative w-5 h-5">
											<div className="absolute w-5 h-5 border-2 dark:border-gray-300 border-gray-400 rounded-full"></div>
											<div
												className="absolute w-5 h-5 border-2 border-transparent border-t-white 
                                                    dark:border-t-black rounded-full animate-spin"
											></div>
										</div>
									</div>
								) : (
									"Sign Out"
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Sidebar;
