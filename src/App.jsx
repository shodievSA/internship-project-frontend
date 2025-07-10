import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import ThemeContextProvider from "./context/ThemeContext";
import { ProjectContextProvider } from "./context/ProjectContext";
import { ToastProvider } from "./components/ui/ToastProvider";
import Projects from "./pages/Projects";
import ProjectLayout from "./layouts/ProjectLayout";
import TeamPage from "./pages/TeamPage";
import TeamMemberDetailsPage from "./pages/TeamMemberDetailsPage";
import AllTasksPage from "./pages/AllTasksPage";
import MyTasksPage from "./pages/MyTasksPage";
import AssignedTasksPage from "./pages/AssignedTasksPage";
import ReviewTasksPage from "./pages/ReviewTasksPage";
import ProjectInvitesPage from "./pages/ProjectInvitesPage";
import Notifications from "./pages/Notifications";
import AiPlanner from "./pages/AiPlanner";
import SignIn from "./pages/SignIn";
import UserInvites from "./pages/UserInvites";
import PrivateRoute from "./components/PrivateRoute";
import Comments from "./pages/Comments";

function App() {

	return (
		<AuthContextProvider>
			<ThemeContextProvider>
				<ToastProvider>
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
									<Route path="team" element={<TeamPage />} />
									<Route path="all-tasks" element={<AllTasksPage />} />
									<Route path="my-tasks" element={<MyTasksPage />} />
									<Route path="assigned-tasks" element={<AssignedTasksPage />} />
									<Route path="review-tasks" element={<ReviewTasksPage />} />
									<Route path="invites" element={<ProjectInvitesPage />} />
								</Route>
								<Route path="/projects/:projectId/my-tasks/:taskId/comments" element={<Comments />} />
								<Route path="/projects/:projectId/assigned-tasks/:taskId/comments" element={<Comments />} />
								<Route path="/projects/:projectId/team/:memberId" element={<TeamMemberDetailsPage />} />
								<Route path="/notifications" element={<Notifications />} />
								<Route path="/ai-planner" element={<AiPlanner />} />
								<Route path="/invites" element={<UserInvites />} />
							</Route>
							<Route path="/sign-in" element={<SignIn />} /> 
						</Routes>
					</Router>
				</ToastProvider>
			</ThemeContextProvider>
		</AuthContextProvider>
	);

}

export default App;
