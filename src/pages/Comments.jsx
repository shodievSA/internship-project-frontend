import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Comments() {

	const { state: { taskTitle } } = useLocation();

	const navigate = useNavigate();

	const mockData = [
		{
			sentBy: "John Doe",
			role: "Project Manager",
			message: "Let's make sure we follow the design system guidelines for this task.",
			avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocJMDbkWRgF0z2vbmrLVfHTYp6WsAC5WH3JNoMsCCFcGnlUfmDI=s96-c",
			createdAt: "Feb 15, 10:30 AM"
		},
		{
			sentBy: "Sarah Johnson",
			role: "Lead Developer",
			message: "I've started working on the wireframes. Will share a draft by tomorrow.",
			avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKWpF6moTyd8FDTVwR9b8WDJx8PSGiNFdfcxikct3-y42SFIw=s96-c",
			createdAt: "Feb 15, 10:30 AM"
		},
		{
			sentBy: "John Doe",
			role: "Project Manager",
			message: "I've looked at some competitor websites and have some ideas for our approach. Let's discuss in the next meeting.",
			avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocJMDbkWRgF0z2vbmrLVfHTYp6WsAC5WH3JNoMsCCFcGnlUfmDI=s96-c",
			createdAt: "Feb 15, 10:30 AM"
		},
		{
			sentBy: "Sarah Johnson",
			role: "Lead Developer",
			message: "I've started working on the wireframes. Will share a draft by tomorrow.",
			avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKWpF6moTyd8FDTVwR9b8WDJx8PSGiNFdfcxikct3-y42SFIw=s96-c",
			createdAt: "Feb 15, 10:30 AM"
		},
	]

	return (
		<div className="h-full flex flex-col px-8 pt-6 gap-y-5">
			<div className="flex gap-x-5 items-center">
				<button 
					className="dark:bg-neutral-950 dark:border-neutral-800 dark:text-white 
					dark:hover:bg-neutral-900 bg-white hover:bg-slate-100 border-[1px] rounded-md p-2"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft className="w-4 h-4" />
				</button>
				<h1 className="text-xl font-semibold">{ taskTitle }</h1>					
			</div>
			<div className="grow flex flex-col gap-y-8 scrollbar-thin dark:scrollbar-thumb-neutral-950 
			dark:scrollbar-track-neutral-800 overflow-y-auto">
				<div className="px-5 flex flex-col gap-y-4 py-5">
					{
						mockData.length === 0 ? (
							<div>This task doesn't have any comments</div>
						) : (
							mockData.map((comment) => {
								return (
									<div className="flex flex-col p-4 border dark:border-neutral-800 
									rounded-md gap-y-4">
										<div className="flex gap-x-2">
											<img src={comment.avatarUrl} className="w-10 h-10 rounded-full" />
											<div className="flex flex-col">
												<h1 className="text-sm">{ comment.sentBy }</h1>
												<h3 className="text-xs">{ comment.role }</h3>
											</div>
											<span className="ml-auto text-sm">{ comment.createdAt }</span>
										</div>
										<div>
											<p>{ comment.message }</p>
										</div>
									</div>
								)
							})
						)
					}
				</div>
			</div>			
			<div className="h-40 p-6">
				<textarea 
					className="w-full h-full rounded-md resize-none dark:bg-black 
					focus:outline-none p-3 border dark:border-neutral-800"
					placeholder="Write your commend here..."
				/>
			</div>
		</div>
	);

}

export default Comments;