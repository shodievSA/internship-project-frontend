
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { House, Sparkles, Bell, LogOut } from 'lucide-react';

function Sidebar({ sidebarCollapsed, setSidebarCollapsed }) {

    const [signoutButtonClicked, setSignoutButtonClicked] = useState(false);

    return (
        <>
            {
                signoutButtonClicked && (
                    <div className="flex items-center justify-center fixed w-full h-full bg-black/80 z-30">
                        <div className="dark:bg-neutral-950 dark:border-neutral-800 bg-white  
                        border-[1px] p-6 rounded-lg flex flex-col gap-y-3 w-[350px] lg:w-[500px]">
                            <h1 className="dark:text-white text-black text-lg lg:text-xl font-semibold">Sign Out</h1>
                            <p className="dark:text-neutral-400 text-neutral-500 text-sm lg:text-base">
                                Are you sure you want to sign out? You will need to log in again
                                to access your workspace.
                            </p>
                            <div className="flex justify-end gap-x-4">
                                <button className="dark:bg-neutral-950 dark:border-neutral-800 dark:text-white 
                                dark:hover:bg-neutral-800 bg-white hover:bg-slate-100 py-2.5 px-4 border-[1px] 
                                rounded-lg font-medium text-sm lg:text-base"
                                    onClick={() => setSignoutButtonClicked(false)}>Cancel</button>
                                <button className="dark:bg-white dark:hover:bg-slate-200 dark:text-black 
                                bg-neutral-900 hover:bg-neutral-900/90 text-white py-2.5 px-4 rounded-lg 
                                font-medium text-sm lg:text-base">Sign Out</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div>
                {/* dark, semi-transparent background color only for mobile and tablet screen sizes */}
                <div className={`${sidebarCollapsed ? 'bg-transparent pointer-events-none' : "bg-black/30"} 
                fixed h-full w-full transition-bg-color duration-200 z-10 lg:hidden`}></div>

                <div className={`${sidebarCollapsed ? 'w-0' : 'w-full lg:w-72'} dark:text-white flex fixed 
                lg:static h-full z-20 transition-[width] duration-500`}>
                    <div className={`${sidebarCollapsed ? 'w-0 border-r-0 dark:border-neutral-800 border-neutral-200'
                        : 'w-72 border-r-[1px] dark:border-neutral-800 border-neutral-200'} dark:bg-zinc-950 bg-neutral-50 
                    transition-[width] duration-500`}>
                        <div className={`${sidebarCollapsed ? 'invisible' : 'visible'} flex flex-col h-full py-4
                        gap-y-8`}>
                            <div className="flex gap-x-3 items-center justify-center px-2">
                                <div className="bg-neutral-200 w-10 h-10 lg:w-12 lg:h-12 rounded-full">
                                    {/* <img src="user_avatar_url_from _db" className='w-full h-full' /> */}
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm md:text-lg font-medium">John Doe</p>
                                    <p className="dark:text-neutral-400 text-neutral-500 text-sm md:text-base">
                                        john.doe.@company.com
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2 px-2">
                                <span className="dark:text-neutral-400 text-neutral-500 text-sm px-3 font-medium">
                                    Navigation
                                </span>
                                <ul className="flex flex-col gap-y-1">
                                    <NavLink to={'/projects'} className='dark:hover:bg-zinc-900 dark:text-neutral-300
                                    dark:hover:text-white hover:bg-neutral-100 text-neutral-600 hover:text-black flex 
                                    items-center gap-x-3 py-2 px-3 rounded-md transition-[background-color] duration-200'>
                                        <House className="w-5 h-5" />
                                        <span>Dashboard</span>
                                    </NavLink>
                                    <NavLink to={'/ai-planner'} className='dark:hover:bg-zinc-900 dark:text-neutral-300
                                    dark:hover:text-white hover:bg-neutral-100 text-neutral-600 hover:text-black flex 
                                    items-center gap-x-3 py-2 px-3 rounded-md'>
                                        <Sparkles className="w-5 h-5" />
                                        <span>AI Planner</span>
                                        <div className="text-xs md:text-sm bg-purple-600 px-2 rounded-full text-white">new</div>
                                    </NavLink>
                                    <NavLink to={'/notifications'} className='dark:hover:bg-zinc-900 dark:text-neutral-300
                                    dark:hover:text-white hover:bg-neutral-100 text-neutral-600 hover:text-black flex 
                                    items-center gap-x-3 py-2 px-3 rounded-md'>
                                        <Bell className="w-5 h-5" />
                                        <span>Notifications</span>
                                    </NavLink>
                                </ul>
                            </div>
                            <div className="mt-auto flex flex-col gap-y-5 dark:border-t-neutral-800 border-t-neutral-200 
                            border-t-[1px] pt-4 px-4">
                                <button className="dark:bg-black dark:hover:bg-neutral-950 dark:border-neutral-800 
                                dark:text-neutral-300 dark:hover:text-white bg-white hover:bg-neutral-100 border-neutral-200
                                text-neutral-600 hover:text-black flex items-center justify-left w-full py-2 px-3 rounded-md 
                                gap-x-3 border-[1px]"
                                    onClick={() => setSignoutButtonClicked(true)}>
                                    <LogOut className="w-4 h-4" />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                                <p className="text-sm text-neutral-500">SmartDesk v1.0</p>
                            </div>
                        </div>
                    </div>
                    <div className='grow lg:hidden' onClick={() => setSidebarCollapsed(true)}></div>
                </div>
            </div>
        </>
    )

}

export default Sidebar;
