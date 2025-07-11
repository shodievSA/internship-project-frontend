import { Bell } from "lucide-react";

function EmptyNotifications() {

    return (
        <div className="h-full flex items-center justify-center pb-10">
            <div className="flex flex-col gap-y-4 md:gap-y-5">
                <div className="flex flex-col gap-y-4 md:gap-y-6 items-center">
                    <div className="p-4 md:p-6 rounded-full dark:bg-neutral-900 bg-slate-100">
                        <Bell className="w-10 h-10 md:w-14 md:h-14 text-purple-700 animate-pulse" />
                    </div>
                    <h1 className="text-lg md:text-2xl font-semibold">You're all caught up!</h1>
                </div>
				<div className="flex flex-col gap-y-8">
					<p className="text-gray-500 max-w-sm md:max-w-lg text-sm md:text-lg text-center">
						No new notifications right now. We'll let you know when something important happens.
					</p>
					<div className="flex flex-col gap-y-5 items-center">
						<div>
							<h3 className="text-xs md:text-base">You will be notified about:</h3>
						</div>
						<div className="flex gap-x-5">
							<div className="text-sm py-1.5 px-4 rounded-full text-gray-600 dark:text-gray-400 
							bg-slate-100 dark:bg-neutral-900">
								Task Assignments
							</div>
							<div className="text-sm py-1.5 px-4 rounded-full text-gray-600 dark:text-gray-400 
							bg-slate-100 dark:bg-neutral-900">
								Task Updates
							</div>
							<div className="text-sm py-1.5 px-4 rounded-full text-gray-600 dark:text-gray-400 
							bg-slate-100 dark:bg-neutral-900">
								New Comments
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>
    );

}

export default EmptyNotifications;