import { NavLink, useLocation } from "react-router-dom";
import { useRef } from "react";

const tabTranslatePositions = {
	"sprints": "translateX(0)",
	"my-tasks": "translateX(100%)",
	"assigned-tasks": "translateX(200%)",
	"review-tasks": "translateX(300%)"
};

function ProjectLayoutNavigation() {

	const toggleRef = useRef();
	const location = useLocation();

	function moveToggle(index) {

		const moveBy = 100 * index;
		toggleRef.current.style.transform = `translateX(${moveBy}%)`

	}

	const currentRouteSegments = location.pathname.split('/');
	const lastSegment = currentRouteSegments[currentRouteSegments.length - 1];

	const initialTranslateX = tabTranslatePositions[lastSegment];

	return (
		<div className="dark:bg-neutral-900 bg-neutral-100 p-1 rounded-md">
			<ul className="grid gap-y-2 grid-cols-[repeat(4,minmax(100px,1fr))] [&>a]:text-center 
			[&>a]:p-2 [&>a]:font-medium [&>a]:rounded-md rounded-md relative w-full">
					<div 
						ref={toggleRef} 
						className="absolute h-full bg-white transition-[transform] duration-300
						rounded-md dark:bg-black"
						style={{ width: "calc(100% / 4)", transform: initialTranslateX }}
					></div>
					<NavLink
						to='sprints'
						className="text-xs md:text-sm z-10 flex items-center justify-center"
						onClick={() => moveToggle(0)}
					>
						Sprints
					</NavLink>
					<NavLink
						to='my-tasks'
						className="text-xs md:text-sm z-10 flex items-center justify-center"
						onClick={() => moveToggle(1)}
					>
						My Tasks
					</NavLink>
					<NavLink
						to='assigned-tasks'
						className="text-xs md:text-sm z-10 flex items-center justify-center"
						onClick={() => moveToggle(2)}
					>
						Delegated
					</NavLink>
					<NavLink
						to='review-tasks'
						className="text-xs md:text-sm z-10 flex items-center justify-center"
						onClick={() => moveToggle(3)}
					>
						Reviews
					</NavLink>
			</ul>
		</div>
	);

}

export default ProjectLayoutNavigation;