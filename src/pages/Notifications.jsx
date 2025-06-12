import { useState } from "react";
import EmptyNotifications from "../components/EmptyNotifications";

function Notifications() {

    const [notificationCount, setNotificationCount] = useState(() => {

        try {

            const count = JSON.parse(localStorage.getItem('notificationCount'));
            return (Number.isInteger(count) && Number.isFinite(count)) ? count : 0;

        } catch {

            return 0;

        }

    });

    return (
        <div className="h-full px-5 pt-10 lg:px-10">
            {
                notificationCount > 0 ? (
                    <div></div>
                ) : (
                    <EmptyNotifications />
                )
            }
        </div>
    );

}

export default Notifications;