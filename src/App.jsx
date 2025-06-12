import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import ThemeContextProvider from "./context/ThemeContext";
import Projects from "./pages/Projects";
import ProjectLayout from "./layouts/ProjectLayout";
import TeamPage from "./pages/TeamPage";
import AllTasksPage from "./pages/AllTasksPage";
import MyTasksPage from "./pages/MyTasksPage";
import AssignedTasksPage from "./pages/AssignedTasksPage";
import ReviewTasksPage from "./pages/ReviewTasksPage";
import InvitesPage from "./pages/InvitesPage";
import Notifications from "./pages/Notifications";
import NotificationsOutlet from "./layouts/NotificationsOutlet";
import NotificationDetails from "./pages/NotificationDetails";
import AiPlanner from "./pages/AiPlanner";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";

function App() {

	return (
		<AuthContextProvider>
			<ThemeContextProvider>
				<Router>
					<Routes>
						<Route element={<PrivateRoute />}>
							<Route path="/" element={<Navigate replace={true} to={"/projects"} />} />						
							<Route path="/projects" element={<Projects />} />
							<Route path="/projects/:projectId" element={<ProjectLayout />}>
								<Route path="team" element={<TeamPage />} />
								<Route path="all-tasks" element={<AllTasksPage />} />
								<Route path="my-tasks" element={<MyTasksPage />} />
								<Route path="assigned-tasks" element={<AssignedTasksPage />} />
								<Route path="review-tasks" element={<ReviewTasksPage /> } />
								<Route path="project-invites" element={<InvitesPage />} />
							</Route>							
							<Route path="/notifications" element={<NotificationsOutlet />}>
								<Route index element={<Notifications />} />
								<Route path=":notificationId" element={<NotificationDetails />} />
							</Route>
							<Route path="/ai-planner" element={<AiPlanner />} />
						</Route>
						<Route path="/sign-in" element={<SignIn />} />
					</Routes>
				</Router>
			</ThemeContextProvider>
		</AuthContextProvider>
	)

}

export default App;
