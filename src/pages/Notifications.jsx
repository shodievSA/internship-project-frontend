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

    if (notificationCount === 0) {
        return (
            <div className="h-full px-5 pt-10 lg:px-10">
                <EmptyNotifications />
            </div>
        );
    }

    return (
        <div className="h-full px-5 pt-10 lg:px-10">

            {/* Other Notifications Section */}
            {notificationCount > 0 && (
                <div>
                    {/* Add your other notifications content here */}
                </div>
            )}
        </div>
    );
}

export default Notifications;