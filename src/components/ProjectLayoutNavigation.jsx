import { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const tabTranslatePositions = {
	sprints: "translateX(0)",
	"my-tasks": "translateX(100%)",
	"assigned-tasks": "translateX(200%)",
	"review-tasks": "translateX(300%)",
};

function ProjectLayoutNavigation() {
	const toggleRef = useRef();
	const location = useLocation();

	const [currentTab, setCurrentTab] = useState(() => {
		const currentRouteSegments = location.pathname.split("/");
		const lastUrlSegment =
			currentRouteSegments[currentRouteSegments.length - 1];

		return lastUrlSegment;
	});

	function handleTab(newTab, tabIndex) {
		const moveBy = 100 * tabIndex;
		toggleRef.current.style.transform = `translateX(${moveBy}%)`;

		setCurrentTab(newTab);
	}

	return (
		<div className="dark:bg-neutral-900 bg-neutral-100 p-1 rounded-md">
			<ul
				className="grid gap-y-2 grid-cols-[repeat(4,minmax(100px,1fr))] [&>a]:text-center 
			[&>a]:p-2 [&>a]:font-medium [&>a]:rounded-md rounded-md relative w-full"
			>
				<div
					ref={toggleRef}
					className="absolute h-full bg-white transition-[transform] duration-300
						rounded-md dark:bg-black w-1/4"
					style={{ transform: tabTranslatePositions[currentTab] }}
				></div>
				<NavLink
					to="sprints"
					className={`text-xs md:text-sm z-10 flex items-center justify-center
						${currentTab === "sprints" ? "text-black dark:text-white" : "text-neutral-500"}`}
					onClick={() => handleTab("sprints", 0)}
				>
					Sprints
				</NavLink>
				<NavLink
					to="my-tasks"
					className={`text-xs md:text-sm z-10 flex items-center justify-center
						${currentTab === "my-tasks" ? "text-black dark:text-white" : "text-neutral-500"}`}
					onClick={() => handleTab("my-tasks", 1)}
				>
					My Tasks
				</NavLink>
				<NavLink
					to="assigned-tasks"
					className={`text-xs md:text-sm z-10 flex items-center justify-center
						${currentTab === "assigned-tasks" ? "text-black dark:text-white" : "text-neutral-500"}`}
					onClick={() => handleTab("assigned-tasks", 2)}
				>
					Delegated
				</NavLink>
				<NavLink
					to="review-tasks"
					className={`text-xs md:text-sm z-10 flex items-center justify-center
						${currentTab === "review-tasks" ? "text-black dark:text-white" : "text-neutral-500"}`}
					onClick={() => handleTab("review-tasks", 3)}
				>
					Reviews
				</NavLink>
			</ul>
		</div>
	);
}

export default ProjectLayoutNavigation;
