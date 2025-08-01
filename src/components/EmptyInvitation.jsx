import { Mail } from "lucide-react";

export function EmptyInvitation() {

    return (
		<div className="h-full flex items-center justify-center pb-10">
            <div className="flex flex-col gap-y-4 md:gap-y-5">
                <div className="flex flex-col gap-y-4 md:gap-y-6 items-center">
                    <div className="p-4 md:p-6 rounded-full dark:bg-neutral-900 bg-slate-100">
                        <Mail className="w-10 h-10 md:w-14 md:h-14 text-purple-700" />
                    </div>
                    <h1 className="text-lg md:text-2xl font-semibold">You're all caught up!</h1>
                </div>
				<div className="flex flex-col gap-y-8">
					<p className="text-gray-500 max-w-sm md:max-w-lg text-sm md:text-lg text-center">
						No new invites right now. We'll let you know when someone invites you.
					</p>
				</div>
            </div>
        </div>
    );

} 