import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import { formatIsoDate } from "../utils/dateUtils";
import { ChevronRight } from "lucide-react";

function OrganizerNotifications({ newNotifications }) {
	const navigate = useNavigate();

	if (newNotifications.length === 0)
		return (
			<EmptyState
				message={"You're all caught up - not a single update in sight!"}
			/>
		);

	return (
		<div>
			<div className="flex flex-col gap-y-5">
				<div>
					<h1>
						You have {newNotifications.length}{" "}
						{newNotifications.length > 1
							? "new notifications"
							: "new notification"}
					</h1>
				</div>
				<div className="flex flex-col gap-y-5">
					{newNotifications.map((notification) => {
						return (
							<div
								className="flex flex-col gap-y-2 p-5 border border-neutral-200 dark:border-neutral-800 
									cursor-pointer rounded-md group/item hover:shadow-md dark:hover:shadow-none 
									dark:hover:border-neutral-700 transition-[box-shadow] duration-300"
								onClick={() =>
									navigate(
										`/notifications#notification-${notification.id}`,
									)
								}
							>
								<h1 className="text-lg font-medium">
									{notification.title}
								</h1>
								<div className="flex justify-between">
									<div>
										<p>{notification.message}</p>
										<span className="text-sm">
											{formatIsoDate(
												notification.createdAt,
											)}
										</span>
									</div>
									<div
										className="opacity-0 group-hover/item:opacity-100 transition-[opacity]
										duration-300"
									>
										<ChevronRight className="w-5 h-5 text-neutral-500 dark:text-neutral-300" />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default OrganizerNotifications;
