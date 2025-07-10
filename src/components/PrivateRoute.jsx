import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AuthSpinner from "./AuthSpinner";
import AppLayout from "../layouts/AppLayout";

function PrivateRoute() {

	const { user, isUserFetched } = useAuthContext();

	return isUserFetched ? (
		!user.isInvited && user ? (
			<AppLayout>
				<Outlet />
			</AppLayout>
		) : (
			<Navigate replace={true} to={"/sign-in"} />
		)
	) : (
		<AuthSpinner />
	);

}

export default PrivateRoute;
