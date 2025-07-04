import { Inbox } from "lucide-react";
import Button from "./ui/Button";

function EmptySearch({ message, onClearFilters }) {

    return (
		<div className="h-full flex items-center justify-center">
			<div className="flex flex-col gap-y-2 items-center justify-center text-center grow">
				<div className="flex flex-col items-center">
					<div className="mb-4">
						<Inbox className="w-14 h-14" />
					</div>
					<div className="flex flex-col">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
							{ message }
						</h3>
						<p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
							Try adjusting your search or filters to find what you're looking for
						</p>
					</div>
				</div>
				<Button 
					onClick={onClearFilters} 
					size="lg"
				>
					Clear all filters
				</Button>
			</div>
		</div>
    );
	
};

export default EmptySearch;
