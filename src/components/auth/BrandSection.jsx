import { ProjectLogo } from '../icons/Icons';
import StatsGrid from './stats/StatsGrid';

const BackgroundOverlay = () => (
    <>
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('path/to/your/image.jpg')"
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A5578]/95 to-[#4A5578]/90 backdrop-blur-[2px]" />
    </>
);

const BrandHeader = () => (
    <>
        <div className="mb-6 sm:mb-8">
            <ProjectLogo className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            SmartDesk
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-center text-gray-200 max-w-md md:max-w-2xl mb-12">
            Manage your projects, track issues, and collaborate with your team in one place.
        </p>
    </>
);

const BrandSection = () => {
    return (
        <div className="w-full md:w-1/2 relative overflow-hidden min-h-[600px] bg-[#4A5578]">
            <BackgroundOverlay />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] p-4 sm:p-6 md:p-8 lg:p-12 md:mt-[120px] text-white">
                <BrandHeader />
                <StatsGrid />
            </div>
        </div>
    );
};

export default BrandSection; 