import { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/userService";
import notificationService from "../services/notificationService";

const NotificationsContext = createContext();

export function NotificationsContextProvider({ children }) {

	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	const [invites, setInvites] = useState([]);
    const [invitesFetched, setInvitesFetched] = useState(false);

	useEffect(() => {

		const fetchNotifications = async () => {

			setLoading(true);
			setError(null);

			try {

				const data = await notificationService.getNotifications();
				setNotifications(data);

				console.log("Fetched notifications:", data);

			} catch (err) {

				setError(err.message);

			} finally {

				setTimeout(() => {

					setLoading(false);

				}, 600);

			}

		};

		fetchNotifications();

	}, []);

	useEffect(() => {

        async function getUserInvites() {

            try {

                const { invites } = await userService.getUserInvites();
                setInvites(invites);

            } catch (err) {

                console.log(err);

            } finally {

                setTimeout(() => {

                    setInvitesFetched(true);

                }, 600);

            }

        }

        getUserInvites();

    }, []);

	const contextData = {
		error,
		loading,
		notifications,
		setNotifications,
		invitesFetched,
		invites,
		setInvites
	};

	return (
		<NotificationsContext.Provider value={contextData}>
			{ children }
		</NotificationsContext.Provider>
	);

}

export const useNotifications = () => useContext(NotificationsContext);