import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function AppLayout({ children }) {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => window.innerWidth < 1024);

    return (
        <div className='flex h-screen bg-neutral-100 dark:bg-[rgb(12,12,12)]'>
            <Sidebar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
            <div className='flex grow h-full lg:py-4 lg:pr-3'>
				<div className='flex flex-col h-full w-full border border-neutral-200 
				dark:border-neutral-800 lg:rounded-xl'>    
					<Topbar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
					<div className='dark:bg-black bg-white dark:text-white grow overflow-auto scrollbar-none
					lg:rounded-bl-xl lg:rounded-br-xl'>
						{ children }
					</div>
				</div>  
            </div>
        </div>
    );

}

export default AppLayout;