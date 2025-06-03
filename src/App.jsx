import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Projects from "./pages/Projects";
import ProjectsOutlet from "./layouts/ProjectsOutlet";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectDetailsOutlet from "./layouts/ProjectDetailsOutlet";
import TeamMemberInfo from "./pages/TeamMemberInfo";
import TaskComments from "./pages/TaskComments";
import Notifications from "./pages/Notifications";
import NotificationsOutlet from "./layouts/NotificationsOutlet";
import NotificationDetails from "./pages/NotificationDetails";
import AiPlanner from "./pages/AIPlanner";
import SignIn from "./pages/Signin";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {

	return (
		<AuthContextProvider>
			<Router>
				<Routes>
					<Route element={<PrivateRoute />}>
						<Route path="/" element={<Navigate replace={true} to={"/projects"} />} />
						<Route path="/projects" element={<ProjectsOutlet />}>
							<Route index element={<Projects />} />
							<Route path=":projectId" element={<ProjectDetailsOutlet />}>
								<Route index element={<ProjectDetails />} />
								<Route path="members/:memberId" element={<TeamMemberInfo />} />
								<Route path="tasks/:taskId/comments" element={<TaskComments />} />
							</Route>
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
		</AuthContextProvider>
	)

}

export default App;
