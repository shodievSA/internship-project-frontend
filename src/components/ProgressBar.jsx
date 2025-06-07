const getProgressColor = (progress) => {
    return progress === 100 ? "bg-green-500 dark:bg-green-500" : "bg-gray-500 dark:bg-white"
}

const ProgressBar = ({ progress, showLabel = true }) => {
    const progressColor = getProgressColor(progress)

    return (
        <div className="space-y-2">
            {showLabel && (
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Progress</span>
                    <span className="progress-badge">
                        {progress}%
                    </span>
                </div>
            )}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                    className={`${progressColor} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}

export default ProgressBar;