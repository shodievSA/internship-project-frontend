import { useState, useEffect, useRef } from 'react';
import AnimateOnScroll from '../Visuals/AnimateOnScroll';

const target = { teams: 5000, projects: 25000, tasks: 50000 };

const Stats = () => {

    const [isVisible, setVisible] = useState(false);
	const [stats, setStats] = useState({ teams: 0, projects: 0, tasks: 0 });

    const statsSectionRef = useRef(null);

    const duration = 2000;
	const steps = 60;
	const stepsInterval = duration / steps;

	useEffect(() => {

		const observer = new IntersectionObserver(

		([entry]) => {

			if (entry.isIntersecting) {

				setVisible(true);
				
				observer.disconnect();

			}

		}, { threshold: 0.35 }

	);

		if (statsSectionRef.current) observer.observe(statsSectionRef.current);

		return () => observer.disconnect();

	}, [])

	useEffect(() => {
		
		if (!isVisible) return;

		const incBy = {

			teams: Math.ceil(target.teams / steps),
			projects: Math.ceil(target.projects / steps),
			tasks: Math.ceil(target.tasks / steps),

		};

		const statsCounter = setInterval(() => {

			setStats(prev => {

				const finalStats = {

					teams: Math.min((prev.teams + incBy.teams), target.teams),
					projects: Math.min((prev.projects + incBy.projects), target.projects),
					tasks: Math.min((prev.tasks + incBy.tasks), target.tasks),
					
				};

				if (

					finalStats.teams === target.teams &&
					finalStats.projects === target.projects &&
					finalStats.tasks === target.tasks

				) {

					clearInterval(statsCounter);
					
				}

				return finalStats;

			});

		}, stepsInterval);

		return () => clearInterval(statsCounter);

	}, [isVisible])
    
    return (
        
		<section

			ref={statsSectionRef}
			className='px-4 py-20 bg-gradient-to-r from-purple-50 to-blue-50'
			id="statistics"
			
		>

			<div

				className='max-w-6xl mx-auto'
				data-aos='fade-up'
				
			>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>

					<dl className='hover:scale-105 transition-transform duration-300'>
						
						<dt

							className='

								text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2

							'

						>

							{ stats.teams }+
							
						</dt>
						<dd className='text-slate-600 text-lg'>Active Teams</dd>

					</dl>

					<dl className='hover:scale-105 transition-transform duration-300'>
						
						<dt

							className='

								text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2

							'

						>

							{ stats.projects }+

						</dt>
						<dd className='text-slate-600 text-lg'>Projects Completed</dd>

					</dl>

					<dl className='hover:scale-105 transition-transform duration-300'>
						
						<dt

							className='

								text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2

							'

						>

							{ stats.tasks }+

						</dt>
						<dd className='text-slate-600 text-lg'>Tasks Managed</dd>

					</dl>

				</div>

			</div>
			
		</section>

    );

}

export default Stats;
