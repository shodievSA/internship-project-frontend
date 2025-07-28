import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import ThemeContextProvider from "./context/ThemeContext";
import { ProjectContextProvider } from "./context/ProjectContext";
import { ToastProvider } from "./components/ui/ToastProvider";
import { NotificationsContextProvider } from "./context/NotificationsContext";
import Projects from "./pages/Projects";
import ProjectLayout from "./layouts/ProjectLayout";
import TeamPage from "./pages/TeamPage";
import TeamMemberDetailsPage from "./pages/TeamMemberDetailsPage";
import ProjectSprints from "./pages/ProjectSprints";
import MyTasksPage from "./pages/MyTasksPage";
import AssignedTasksPage from "./pages/AssignedTasksPage";
import ReviewTasksPage from "./pages/ReviewTasksPage";
import ProjectInvitesPage from "./pages/ProjectInvitesPage";
import Notifications from "./pages/Notifications";
import Organizer from "./pages/Organizer";
import SignIn from "./pages/SignIn";
import UserInvites from "./pages/UserInvites";
import PrivateRoute from "./components/PrivateRoute";
import Comments from "./pages/Comments";
import ProjectSprint from "./pages/ProjectSprint";
import ProjectsContextProvider from "./context/ProjectsContext";

function App() {

	return (
		<AuthContextProvider>
			<ToastProvider>
				<ThemeContextProvider>
					<ProjectsContextProvider>
						<NotificationsContextProvider>
							<Router>
								<Routes>
									<Route element={<PrivateRoute />}>
										<Route path="/" element={<Navigate replace={true} to={"/projects"} />} />
										<Route path="/projects" element={<Projects />} />
										<Route path="/projects/:projectId" element={
											<ProjectContextProvider>
												<ProjectLayout />
											</ProjectContextProvider>
										}>
											<Route path="sprints" element={<ProjectSprints />} />
											<Route path="my-tasks" element={<MyTasksPage />} />
											<Route path="assigned-tasks" element={<AssignedTasksPage />} />
											<Route path="review-tasks" element={<ReviewTasksPage />} />
										</Route>
										<Route path="/projects/:projectId/sprints" element={<ProjectSprints />} />
										<Route 
											path="/projects/:projectId/sprints/:sprintId" 
											element={
												<ProjectContextProvider>
													<ProjectSprint />
												</ProjectContextProvider>
											} 
										/>
										<Route 
											path="/projects/:projectId/team" 
											element={ 
												<ProjectContextProvider>
													<TeamPage />
												</ProjectContextProvider>
											} 
										/>
										<Route path="/projects/:projectId/invites" element={<ProjectInvitesPage />} />
										<Route path="/projects/:projectId/my-tasks/:taskId/comments" element={<Comments />} />
										<Route path="/projects/:projectId/assigned-tasks/:taskId/comments" element={<Comments />} />
										<Route path="/projects/:projectId/team/:memberId" element={<TeamMemberDetailsPage />} />
										<Route path="/notifications" element={<Notifications />} />
										<Route path="/organizer" element={<Organizer />} />
										<Route path="/invites" element={<UserInvites />} />
									</Route>
									<Route path="/sign-in" element={<SignIn />} /> 
								</Routes>
							</Router>
						</NotificationsContextProvider>
					</ProjectsContextProvider>
				</ThemeContextProvider>
			</ToastProvider>
		</AuthContextProvider>
	);

}

export default App;
