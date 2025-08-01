import { Brain, Sparkles } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { features } from "../utils/constant";

const EmptyAiPlanner = () => {
	return (
		<div className="bg-white dark:bg-black flex items-center justify-center h-full pb-10">
			<div className="flex flex-col gap-y-5 max-w-2xl w-full text-center">
				{/* Heading */}
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
					AI Planner
				</h1>

				<p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
					Your intelligent planning assistant is ready to help you
					stay organized. Get personalized daily reports with tasks,
					priorities, and insights.
				</p>

				{/* Features Preview */}
				<div className="grid md:grid-cols-3 gap-6 mb-8">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							{...feature}
							className={`animate-${index === 0 ? "feature-pop" : index === 1 ? "feature-pop-delay-1" : "feature-pop-delay-2"} opacity-0`}
						/>
					))}
				</div>

				{/* Call to Action */}
				<div className="space-y-3">
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Your first daily report will be generated once you add
						some tasks
					</p>
				</div>

				{/* Bottom Illustration */}
				<div className="mt-8 opacity-60">
					<div className="flex justify-center items-center space-x-2 text-gray-400 dark:text-gray-500">
						<div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
						<div
							className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"
							style={{ animationDelay: "0.2s" }}
						></div>
						<div
							className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"
							style={{ animationDelay: "0.4s" }}
						></div>
					</div>
					<p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
						AI is ready to assist you
					</p>
				</div>
			</div>
		</div>
	);
};

export default EmptyAiPlanner;
