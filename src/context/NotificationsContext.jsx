import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuthContext } from "./AuthContext";
import userService from "../services/userService";
import notificationService from "../services/notificationService";
const SERVER_HOST = import.meta.env.VITE_HOST;

const NotificationsContext = createContext();

export function NotificationsContextProvider({ children }) {

	const { user } = useAuthContext();

	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	const [invites, setInvites] = useState([]);
    const [invitesFetched, setInvitesFetched] = useState(false);

	const sockekRef = useRef(null);

	useEffect(() => {

		sockekRef.current = new WebSocket(`ws://${SERVER_HOST}/notifications`);

		sockekRef.current.onopen = (event) => {

			if (event.type === "open") {

				sockekRef.current.send(JSON.stringify({
					type: "identify-user",
					userId: user.id
				}));

			}

		}

		sockekRef.current.onmessage = (event) => {

			const data = JSON.parse(event.data);

			

		}

	}, []);

	useEffect(() => {

		const fetchNotifications = async () => {

			setLoading(true);
			setError(null);

			try {

				const data = await notificationService.getNotifications();
				setNotifications(data);

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