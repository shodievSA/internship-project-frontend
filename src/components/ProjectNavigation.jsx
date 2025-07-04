import { NavLink } from "react-router-dom";

function ProjectNavigation({ projectState }) {

	return (
		<ul className="dark:bg-neutral-900 bg-neutral-100 p-1.5 grid gap-y-2 grid-cols-[repeat(3,minmax(100px,1fr))] 
            xl:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] [&>a]:text-center [&>a]:p-2 [&>a]:font-medium [&>a]:rounded-md 
            rounded-md mb-2">
                <NavLink
                    to='team'
                    state={{ projectPreview: projectState }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Team
                </NavLink>
                <NavLink
                    to='all-tasks'
                    state={{ projectPreview: projectState }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    All Tasks
                </NavLink>
                <NavLink
                    to='my-tasks'
                    state={{ projectPreview: projectState }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    My Tasks
                </NavLink>
                <NavLink
                    to='assigned-tasks'
                    state={{ projectPreview: projectState }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Assigned
                </NavLink>
                <NavLink
                    to='review-tasks'
                    state={{ projectPreview: projectState }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Reviews
                </NavLink>
                <NavLink
                    to='project-invites'
                    state={{ projectPreview: projectState }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Invites
                </NavLink>
            </ul>
	)

}

export default ProjectNavigation;