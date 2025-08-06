import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AppLayout({ children }) {

	const [sidebarCollapsed, setSidebarCollapsed] = useState(() => window.innerWidth < 1440);

	useEffect(() => {

		function handleWindowResize() {

			setSidebarCollapsed(window.innerWidth < 1440);

		}

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		}

	}, []);

	return (
		<div className="flex h-screen bg-neutral-100 dark:bg-[rgb(12,12,12)]">
			<Sidebar
				sidebarCollapsed={sidebarCollapsed}
				setSidebarCollapsed={setSidebarCollapsed}
			/>
			<div className="flex flex-1 h-full 2xl:py-4 2xl:pr-3">
				<div className="flex flex-col h-full w-full border border-neutral-200 
				dark:border-neutral-800 2xl:rounded-xl">
					<Topbar
						sidebarCollapsed={sidebarCollapsed}
						setSidebarCollapsed={setSidebarCollapsed}
					/>
					<div className="dark:bg-black bg-white dark:text-white grow overflow-auto scrollbar-none
					2xl:rounded-bl-xl 2xl:rounded-br-xl">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
	
}

export default AppLayout;
