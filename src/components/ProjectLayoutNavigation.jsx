import { NavLink } from "react-router-dom";

function ProjectLayoutNavigation() {

	return (
		<ul className="dark:bg-neutral-900 bg-neutral-100 p-1 grid gap-y-2 grid-cols-[repeat(2,minmax(100px,1fr))] 
		lg:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] [&>a]:text-center [&>a]:p-2 [&>a]:font-medium [&>a]:rounded-md 
		rounded-md">
                <NavLink
                    to='sprints'
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm  
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Sprints
                </NavLink>
                <NavLink
                    to='my-tasks'
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    My Tasks
                </NavLink>
                <NavLink
                    to='assigned-tasks'
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Assigned by Me
                </NavLink>
                <NavLink
                    to='review-tasks'
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Reviews
                </NavLink>
            </ul>
	);

}

export default ProjectLayoutNavigation;