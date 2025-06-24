import { useThemeContext } from '../context/ThemeContext';
import { PanelRight, Sun, Moon } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

function Topbar({ sidebarCollapsed, setSidebarCollapsed }) {

    const { user } = useAuthContext();
    const { themeMode, setThemeMode } = useThemeContext();

    return (
        <div className='dark:bg-black dark:text-white dark:border-neutral-800 flex items-center 
        justify-between px-6 lg:px-8 h-16 flex-shrink-0 border-b-[1px] border-neutral-200'>
            <div className='flex items-center gap-x-1'>
                <button 
                className='dark:hover:bg-neutral-900 hover:bg-neutral-50 p-2 rounded-md'
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                    <PanelRight className='w-4 h-4 rotate-180' />
                </button>
                <div>
                    <h3 className='font-medium text-sm lg:text-lg'>
                        { displayGreetingMessage(user.fullName.split(" ")[0]) }
                    </h3>
                </div>
            </div> 
            <button 
            className='dark:hover:bg-neutral-900 dark:border-neutral-800 p-2 border-[1px] rounded-md 
            border-neutral-200 hover:bg-neutral-50'
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light') }
            >
                { themeMode === 'light' ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' /> }
            </button>                    
        </div>
    )

}

function displayGreetingMessage(userName) {

    const date = new Date();
    const hours = date.getHours();

    if (hours >= 5 && hours <= 11) {
        return "Good morning, " + userName;
    } else if (hours >= 12 && hours <= 17) {
        return "Good afternoon, " + userName;
    } else if (hours >= 18 && hours <= 22 ) {
        return "Good evening, " + userName;
    } else {
        return "Good night, " + userName;
    }

}

export default Topbar;