import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useToast } from "../components/ui/ToastProvider";
import { useAuthContext } from "./AuthContext";
import userService from "../services/userService";
import notificationService from "../services/notificationService";
const SERVER_HOST = import.meta.env.VITE_HOST;

const NotificationsContext = createContext();

export function NotificationsContextProvider({ children }) {

	const { user } = useAuthContext();
	const { showToast } = useToast();

	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	const [invites, setInvites] = useState([]);
	const [invitesFetched, setInvitesFetched] = useState(false);

	const sockekRef = useRef(null);

	useEffect(() => {

		if (user) {

			sockekRef.current = new WebSocket(`wss://${SERVER_HOST}/notifications`);

			sockekRef.current.onopen = (event) => {

				if (event.type === "open") {

					sockekRef.current.send(JSON.stringify({
						type: "identify-user",
						userId: user.id,
					}));

				}

			};

			sockekRef.current.onmessage = (event) => {

				const data = JSON.parse(event.data);

				if (data.type === "new-notification") {

					const newNotification = data.newNotification;

					setNotifications((prevNotifications) => [
						newNotification,
						...prevNotifications,
					]);

					showToast({
						variant: "success",
						title: "New notification!",
						message: newNotification.message,
					});

					const audio = document.createElement("audio");

					audio.src = "/new-notif-melody.wav";
					audio.preload = "auto";
					audio.style.display = "none";      
					document.body.appendChild(audio);

					audio.play().then(() => {
						audio.addEventListener("ended", () => {
							audio.remove();
						});
					}).catch(err => {
						console.error("Playback failed:", err);
					});

				} else if (data.type === "new-invite") {

					const newInvite = data.newInvite;

					console.log(newInvite);

					setInvites((prevInvites) => [newInvite, ...prevInvites]);

					showToast({
						variant: "success",
						title: "New invite!",
						message: newInvite.message,
					});

				}

			};

		}

	}, [user]);

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
				}, 200);

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
				}, 200);

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
		setInvites,
	};

	return (
		<NotificationsContext.Provider value={contextData}>
			{children}
		</NotificationsContext.Provider>
	);
	
}

export const useNotifications = () => useContext(NotificationsContext);
