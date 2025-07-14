function LoadingReport() {

	return (
		<div className="h-full flex items-center justify-center">
			<div className="flex items-center gap-y-8 flex-col">
				<div className="flex gap-x-5">
					<div className="animate-float [animation-delay:0s] w-3 h-3 bg-slate-300 dark:bg-neutral-600 rounded-full"></div>
					<div className="animate-float [animation-delay:0.2s] w-3 h-3 bg-slate-300 dark:bg-neutral-600 rounded-full"></div>
					<div className="animate-float [animation-delay:0.4s] w-3 h-3 bg-slate-300 dark:bg-neutral-600 rounded-full"></div>
				</div>
				<div>
					<h1 className="text-xl font-medium text-slate-500 dark:text-neutral-300">
						Hang on - your daily report is on its way!
					</h1>
				</div>
			</div>
		</div>
	)

}

export default LoadingReport;