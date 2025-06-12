import { Mail } from "lucide-react";

function EmptyNotifications() {

    return (
        <div className="h-full flex items-center justify-center pb-10">
            <div className="flex flex-col gap-y-4 md:gap-y-5">
                <div className="flex flex-col gap-y-4 md:gap-y-6 items-center">
                    <div className="p-4 md:p-6 rounded-full dark:bg-neutral-900 bg-slate-100">
                        <Mail className="w-10 h-10 md:w-14 md:h-14 text-purple-700" />
                    </div>
                    <h1 className="text-lg md:text-2xl font-medium">No notifications yet</h1>
                </div>
                <p className="text-gray-500 max-w-sm md:max-w-lg text-sm md:text-lg text-center">
                    You're all caught up! When you receive new notifications about tasks, 
                    projects or updates, they'll appear here.
                </p>
            </div>
        </div>
    );

}

export default EmptyNotifications;