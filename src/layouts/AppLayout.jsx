import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function AppLayout({ children }) {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => window.innerWidth < 1024);

    return (
        <div className='flex h-screen'>
            <Sidebar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
            <div className='flex flex-col grow h-full py-4 pr-3 bg-neutral-100 dark:bg-neutral-900'>    
				<Topbar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
				<div className='dark:bg-black bg-white dark:text-white grow overflow-auto scrollbar-none
				rounded-bl-xl rounded-br-xl'>
					{ children }
				</div>  
            </div>
        </div>
    );

}

export default AppLayout;