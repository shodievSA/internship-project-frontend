import { Brain, Sparkles } from "lucide-react"
import FeatureCard from "./FeatureCard"
import { features } from "../utils/constant"

const EmptyAiPlanner = () => {
    return (
        <div className="bg-white dark:bg-black flex items-center justify-center p-3">
            <div className="max-w-2xl w-full text-center">
                {/* Main Icon */}
                <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Brain className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-800 dark:text-yellow-950" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Welcome to AI Planner</h1>

                <p className="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Your intelligent planning assistant is ready to help you stay organized. Get personalized daily reports with
                    tasks, priorities, and insights.
                </p>

                {/* Features Preview */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            {...feature}
                            className={`animate-${index === 0 ? 'feature-pop' : index === 1 ? 'feature-pop-delay-1' : 'feature-pop-delay-2'} opacity-0`}
                        />
                    ))}
                </div>

                {/* Call to Action */}
                <div className="space-y-3">


                    <p className="text-sm text-gray-500 dark:text-gray-400">Your first daily report will be generated once you add some tasks</p>
                </div>

                {/* Bottom Illustration */}
                <div className="mt-8 opacity-60">
                    <div className="flex justify-center items-center space-x-2 text-gray-400 dark:text-gray-500">
                        <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">AI is ready to assist you</p>
                </div>
            </div>
        </div>
    )
}

export default EmptyAiPlanner;