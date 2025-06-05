import StatCard from './StatCard';

const statsData = [
    { value: '10k+', label: 'Teams' },
    { value: '50k+', label: 'Projects' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
];


const StatsGrid = () => (
    <div className="grid grid-cols-2 gap-6 w-full max-w-2xl px-4">
        {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
        ))}
    </div>
);

export default StatsGrid; 