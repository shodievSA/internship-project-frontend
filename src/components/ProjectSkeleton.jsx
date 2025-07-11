function ProjectSkeleton() {

	return (
		<div className="bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-neutral-800 
		rounded-md p-6 w-full text-gray-900 dark:text-white shadow-sm">
			<div className="flex items-start justify-between mb-4">
				<div className="px-2 rounded-full bg-slate-300 dark:bg-neutral-800 animate-pulse">
					<p className="invisible text-lg">Project Title</p>
				</div>
				<div className="flex gap-2">
					<span className="bg-slate-300 dark:bg-neutral-800 animate-pulse px-2 py-0.5 
					rounded-full">
						<p className="invisible text-xs">Status</p>
					</span>
					<span className="bg-slate-300 dark:bg-neutral-800 animate-pulse px-2 py-0.5 
					rounded-full">
						<p className="invisible text-xs">Status</p>
					</span>
				</div>
			</div>

			<div className="flex items-center mb-6 bg-slate-300 dark:bg-neutral-800 animate-pulse
			rounded-full w-max">
				<span className="text-sm invisible">Created: YYYY/MM/DD</span>
			</div>

			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2 bg-slate-300 dark:bg-neutral-800 animate-pulse
				rounded-full w-max">
					<span className="text-sm invisible">member count</span>
				</div>
				<div className="flex items-center gap-2 bg-slate-300 dark:bg-neutral-800 animate-pulse
				rounded-full w-max">
					<span className="text-sm invisible">count / count tasks</span>
				</div>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<span className="text-gray-500 dark:text-gray-400 text-sm bg-slate-300 
					dark:bg-neutral-800 animate-pulse rounded-full">
						<p className="invisible">Progress</p>
					</span>
					<span className="text-gray-700 dark:text-gray-300 text-sm bg-slate-300
					dark:bg-neutral-800 animate-pulse rounded-full">
						<p className="invisible">number%</p>
					</span>
				</div>
				<div className="w-full bg-slate-300 dark:bg-neutral-800 animate-pulse rounded-full h-2">
					<div className="h-2 rounded-full transition-all duration-300" />
				</div>
			</div>
		</div>
	)

}

export default ProjectSkeleton;