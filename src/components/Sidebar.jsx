function Sidebar({ sidebarCollapsed, setSidebarCollapsed }) {

    return (
        <div>
            {/* dark, semi-transparent background color only for mobile and tablet screen sizes */}
            <div className={`${sidebarCollapsed ? 'bg-transparent pointer-events-none' : "bg-black/30"} 
            fixed h-full w-full transition-bg-color duration-200 z-10 lg:hidden`}></div> 

            <div className={`${sidebarCollapsed ? 'w-0' : 'w-full lg:w-64'} dark:text-white flex fixed 
            lg:static h-full z-20 transition-[width] duration-500`}>
                <div className={`${sidebarCollapsed ? 'w-0 border-r-0 dark:border-neutral-800 border-neutral-200' 
                : 'w-64 border-r-[1px] dark:border-neutral-800 border-neutral-200'} dark:bg-neutral-900 bg-white 
                transition-[width] duration-500`}>
                    <div className={`${sidebarCollapsed ? 'invisible' : 'visible'}`}>
                        Sidebar
                    </div>
                </div>
                <div className='grow lg:hidden' onClick={() => setSidebarCollapsed(true)}></div>
            </div>
        </div>
    )

}

export default Sidebar;