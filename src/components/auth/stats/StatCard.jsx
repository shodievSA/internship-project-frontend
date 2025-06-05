const StatCard = ({ value, label }) => (
    <div className="bg-white/10 p-3 sm:p-4 md:p-8 rounded-lg backdrop-blur-sm md:min-h-[70px] flex flex-col justify-center hover:bg-white/15 transition-colors">
        <div className="font-bold text-lg sm:text-xl mb-1">{value}</div>
        <div className="text-xs sm:text-sm md:text-lg text-gray-200">{label}</div>
    </div>
);

export default StatCard; 