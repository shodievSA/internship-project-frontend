import { colorMap } from "../utils/constant"


const FeatureCard = ({
    icon: Icon,
    title,
    description,
    color = "blue",
    delay = 1,
}) => {

    const colors = colorMap[color]

    const animationClasses = {
        1: "animate-feature-pop-delay-1",
        2: "animate-feature-pop-delay-2",
        3: "animate-feature-pop-delay-3"
    }

    return (
        <div className={`opacity-0 bg-white dark:bg-zinc-950 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-neutral-800 ${animationClasses[delay]} hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1`}>
            <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:animate-feature-bounce`}>
                <Icon className={`w-5 h-5 ${colors.text} group-hover:animate-icon-spin`} />
            </div>
            <h3 className={`font-semibold text-gray-900 dark:text-white mb-1.5 ${colors.hover} transition-colors duration-300`}>
                {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
            </p>
        </div>
    )
}

export default FeatureCard;