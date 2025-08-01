import { Shield, Clock, Brain } from "lucide-react";

const BrandSection = () => {
	return (
		<div className="my-auto w-full lg:w-[60%] lg:px-16 lg:py-0 px-6 py-10 lg:flex lg:flex-col">
			<div className="max-w-4xl">
				{/* Header */}
				<div className="flex flex-col ">
					<div className="mb-12">
						<h1 className="text-center lg:text-left text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 lg:mb-6">
							SmartDesk Pro
						</h1>
						<p className="text-center lg:text-left text-lg md:text-xl lg:text-xl text-gray-600 max-w-2xl leading-relaxed">
							The intelligent workspace where teams collaborate,
							plan, and achieve more with AI-powered insights.
						</p>
					</div>

					{/* Statistics */}
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
						<div className="bg-white rounded-lg p-4 lg:p-6 shadow-md">
							<div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
								10K+
							</div>
							<div className="text-sm lg:text-base text-blue-600">
								Teams
							</div>
						</div>
						<div className="bg-white rounded-lg p-4 lg:p-6 shadow-md">
							<div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1">
								50K+
							</div>
							<div className="text-sm lg:text-base text-purple-600">
								Projects
							</div>
						</div>
						<div className="bg-white rounded-lg p-4 lg:p-6 shadow-md">
							<div className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">
								99.9%
							</div>
							<div className="text-sm lg:text-base text-green-600">
								Uptime
							</div>
						</div>
						<div className="bg-white rounded-lg p-4 lg:p-6 shadow-md">
							<div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">
								24/7
							</div>
							<div className="text-sm lg:text-base text-orange-600">
								Support
							</div>
						</div>
					</div>
				</div>

				{/* Features Section */}
				<div>
					<h2 className="text-center lg:text-left text-2xl font-bold text-gray-900 mb-6 lg:mb-8">
						Why teams choose SmartDesk?
					</h2>
					<div className="grid md:grid-cols-3 gap-6 lg:gap-8">
						<div className="bg-white rounded-lg p-6 shadow-md">
							<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
								<Shield className="w-6 h-6 text-blue-600" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Enterprise Security
							</h3>
							<p className="text-gray-600 text-sm lg:text-base">
								Bank-level encryption and compliance standards
							</p>
						</div>
						<div className="bg-white rounded-lg p-6 shadow-md">
							<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
								<Clock className="w-6 h-6 text-purple-600" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Instant Setup
							</h3>
							<p className="text-gray-600 text-sm lg:text-base">
								Ready to use in under 30 seconds
							</p>
						</div>
						<div className="bg-white rounded-lg p-6 shadow-md">
							<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
								<Brain className="w-6 h-6 text-green-600" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								AI Planner
							</h3>
							<p className="text-gray-600 text-sm lg:text-base">
								Smart daily task prioritization
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BrandSection;
