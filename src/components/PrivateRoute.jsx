import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AuthSpinner from "./AuthSpinner";

function PrivateRoute() {

    const { user, isUserFetched } = useAuthContext();

    return (
        isUserFetched ? (
            user ? (
                <Outlet />
            ) : (
                <Navigate replace={true} to={"/sign-in"} />
            )
        ) : (
            <AuthSpinner />
        )
    )

}

export default PrivateRoute;