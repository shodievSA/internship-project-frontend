import { Inbox } from "lucide-react";

function EmptyState({ message }) {
	return (
		<div className="h-full flex items-center justify-center">
			<div className="flex flex-col items-center gap-y-3 w-[400px]">
				<Inbox className="w-20 h-20" />
				<div className="flex flex-col gap-y-2 items-center">
					<h1 className="text-lg  text-center text-balance
					leading-normal">
						{ message }
					</h1>
				</div>
			</div>
		</div>
	);
}

export default EmptyState;
