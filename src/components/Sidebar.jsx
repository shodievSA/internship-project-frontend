import { useState, useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationsContext";
import userService from "../services/userService";
import { NavLink } from "react-router-dom";
import { House, Sparkles, Bell, LogOut, MailPlus } from 'lucide-react';

function Sidebar({ sidebarCollapsed, setSidebarCollapsed }) {

    const { user, setUser } = useAuthContext();
	const { loading, error, notifications, invitesFetched, invites } = useNotifications();

    const [signoutButtonClicked, setSignoutButtonClicked] = useState(false);
    const [isUserBeingSignedOut, setIsUserBeingSignedOut] = useState(false);

	const unviewedNotifications = useMemo(() => {

		if (loading || error) return [];

		return notifications.filter((notification) => !notification.isViewed);

	}, [loading, error, notifications]);

	const pendingInvites = useMemo(() => {
	
		if (!invitesFetched) return [];

		return invites.filter((invite) => invite.status === "pending");

	}, [invitesFetched, invites]);

    async function logOutUser() {

        setIsUserBeingSignedOut(true);

        try {

            await userService.logOut();
            setUser(null);

        } catch {

            console.log('Error occured while logging out the user.')

        } finally {

            setIsUserBeingSignedOut(false);

        }

    }

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
                            <div className="flex justify-end gap-x-4 mt-2">
                                <button
                                    disabled={isUserBeingSignedOut}
                                    className={`dark:bg-neutral-950 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800 
                                    bg-white hover:bg-slate-100 py-2.5 px-4 border-[1px] rounded-md font-medium text-sm lg:text-base 
                                    ${isUserBeingSignedOut ? 'cursor-not-allowed' : 'cursor-pointer'} disabled:opacity-50`}
                                    onClick={() => setSignoutButtonClicked(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isUserBeingSignedOut}
                                    className='dark:bg-white dark:hover:bg-slate-200 dark:text-black bg-neutral-900 
                                    hover:bg-neutral-900/90 text-white py-2.5 px-4 rounded-md font-medium text-sm 
                                    lg:text-base disabled:opacity-50'
                                    onClick={logOutUser}
                                >
                                    {
                                        isUserBeingSignedOut ? (
                                            <div className="flex justify-center">
                                                <div className="relative w-5 h-5">
                                                    <div className="absolute w-5 h-5 border-2 dark:border-gray-300 border-gray-400 rounded-full"></div>
                                                    <div className="absolute w-5 h-5 border-2 border-transparent border-t-white 
                                                    dark:border-t-black rounded-full animate-spin"></div>
                                                </div>
                                            </div>
                                        ) : (
                                            "Sign Out"
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div>
                {/* dark, semi-transparent background color only for mobile and tablet screen sizes */}
                <div className={`${sidebarCollapsed ? 'bg-transparent pointer-events-none' : "bg-black/30"} 
                fixed h-full w-full transition-bg-color duration-200 z-10 lg:hidden`}></div>

                <div className={`${sidebarCollapsed ? 'w-0' : 'w-full lg:w-64'} dark:text-white flex fixed 
                lg:static h-full z-20 transition-[width] duration-500`}>
                    <div className={`${sidebarCollapsed ? 'w-0 border-r-0 dark:border-neutral-800 border-neutral-200'
                        : 'w-64'} dark:bg-neutral-900 bg-neutral-100 
                    transition-[width] duration-500`}>
                        <div className={`${sidebarCollapsed ? 'invisible' : 'visible'} flex flex-col h-full pt-4
                        gap-y-8`}>
                            <div className="flex gap-x-3 items-center justify-start px-2">
                                <div className="bg-neutral-200 w-10 h-10 rounded-full flex-shrink-0">
                                    <img src={user.avatarUrl} className='w-full h-full rounded-full' />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium">{user.fullName}</p>
                                    <p className="dark:text-neutral-400 text-neutral-500 text-sm truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="dark:text-neutral-400 text-neutral-500 text-xs px-3 font-semibold px-1">
                                    MAIN MENU
                                </span>
                                <ul className="flex flex-col gap-y-1 font-medium text-sm px-1">
                                    <NavLink to={'/projects'} className='dark:hover:bg-neutral-800 dark:text-neutral-300
                                    dark:hover:text-white hover:bg-neutral-200 text-neutral-600 hover:text-black flex 
                                    items-center gap-x-3 py-2 px-3 rounded-md transition-[background-color] duration-200'>
                                        <House className="w-5 h-5" />
                                        <span>Dashboard</span>
                                    </NavLink>
                                    <NavLink to={'/organizer'} className='dark:hover:bg-neutral-800 dark:text-neutral-300
                                    dark:hover:text-white hover:bg-neutral-200 text-neutral-600 hover:text-black flex 
                                    items-center gap-x-3 py-2 px-3 rounded-md'>
                                        <Sparkles className="w-5 h-5" />
                                        <span>Organizer</span>
                                    </NavLink>
                                    <NavLink to={'/notifications'} className='dark:hover:bg-neutral-800 dark:text-neutral-300
                                    dark:hover:text-white hover:bg-neutral-200 text-neutral-600 hover:text-black flex 
                                    items-center gap-x-3 py-2 px-3 rounded-md'>
										<div className="flex items-center gap-x-3">
											<Bell className="w-5 h-5" />
											<span>Notifications</span>
										</div>
										{ unviewedNotifications.length > 0 && (
											<div className="flex items-center gap-x-4">
												<span className="flex items-center justify-center text-[10px] bg-red-500 
												rounded-full text-white w-5 h-5">
													{ unviewedNotifications.length > 99 ? "99+" : unviewedNotifications.length }
												</span>
												<span className="relative flex h-3 w-3">
													<span className="animate-ping absolute inline-flex h-full w-full rounded-full 
													bg-sky-400 opacity-75"></span>
													<span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
												</span>
											</div>
										)}
                                    </NavLink>
									<NavLink to={'/invites'} className='dark:hover:bg-neutral-800 dark:text-neutral-300
                                    dark:hover:text-white hover:bg-neutral-200 text-neutral-600 hover:text-black flex 
                                    items-center gap-x-3 py-2 px-3 rounded-md transition-[background-color] duration-200'>
										<div className="flex items-center gap-x-3">
											<MailPlus className="w-5 h-5" />
											<span>Invites</span>
										</div>
										{ pendingInvites.length > 0 && (
											<div className="flex items-center gap-x-4">
												<span className="flex items-center justify-center text-[10px] bg-red-500 
												rounded-full text-white w-5 h-5">
													{ pendingInvites.length > 99 ? "99+" : pendingInvites.length }
												</span>
												<span className="relative flex h-3 w-3">
													<span className="animate-ping absolute inline-flex h-full w-full rounded-full 
													bg-sky-400 opacity-75"></span>
													<span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
												</span>
											</div>
										)}
                                    </NavLink>
                                </ul>
                            </div>
                            <div className="mt-auto flex flex-col gap-y-5 dark:border-t-neutral-800 border-t-neutral-200 
                            border-t-[1px] p-4">
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
