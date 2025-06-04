import { ProjectLogo } from '../icons/Icons';

const BrandSection = () => {
    return (
        <div className="w-full md:w-1/2 relative overflow-hidden min-h-[600px] bg-[#4A5578]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                }}
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A5578]/95 to-[#4A5578]/90 backdrop-blur-[2px]"></div>

            {/* Brand Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] p-4 sm:p-6 md:p-8 lg:p-12 md:mt-[120px] text-white">
                {/* Logo */}
                <div className="mb-6 sm:mb-8">
                    <ProjectLogo className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-center">
                    SmartDesk
                </h1>
                <p className="text-base sm:text-lg md:text-[22px] font-semibold mb-12 text-center max-w-md px-4 text-gray-200">
                    Manage your projects, track issues, and collaborate with your team in one place.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-md md:max-w-2xl px-4">
                    <div className="bg-white/10 p-3 sm:p-4 md:p-8 rounded-lg backdrop-blur-sm md:min-h-[70px] flex flex-col justify-center hover:bg-white/15 transition-colors">
                        <div className="font-bold text-lg sm:text-xl mb-1">10k+</div>
                        <div className="text-xs sm:text-sm md:text-lg text-gray-200">Teams</div>
                    </div>
                    <div className="bg-white/10 p-3 sm:p-4 md:p-8 rounded-lg backdrop-blur-sm md:min-h-[70px] flex flex-col justify-center hover:bg-white/15 transition-colors">
                        <div className="font-bold text-lg sm:text-xl mb-1">50k+</div>
                        <div className="text-xs sm:text-sm text-gray-200">Projects</div>
                    </div>
                    <div className="bg-white/10 p-3 sm:p-4 md:p-8 rounded-lg backdrop-blur-sm md:min-h-[70px] flex flex-col justify-center hover:bg-white/15 transition-colors">
                        <div className="font-bold text-lg sm:text-xl mb-1">99.9%</div>
                        <div className="text-xs sm:text-sm text-gray-200">Uptime</div>
                    </div>
                    <div className="bg-white/10 p-3 sm:p-4 md:p-8 rounded-lg backdrop-blur-sm md:min-h-[70px] flex flex-col justify-center hover:bg-white/15 transition-colors">
                        <div className="font-bold text-lg sm:text-xl mb-1">24/7</div>
                        <div className="text-xs sm:text-sm text-gray-200">Support</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandSection; 