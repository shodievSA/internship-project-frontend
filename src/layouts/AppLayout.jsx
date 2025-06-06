import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function AppLayout({ children }) {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => window.innerWidth < 1024);

    return (
        <div className='flex h-screen w-full'>
            <Sidebar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
            <div className='flex flex-col grow'>               
                <Topbar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
                <div className='dark:bg-black dark:text-white grow overflow-y-auto p-10'>
                    { children }
                </div>
            </div>
        </div>
    );

}

export default AppLayout;