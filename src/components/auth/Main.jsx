import { useState, useEffect, useRef } from 'react';
import ScrollIndicator from './ScrollIndicator';
import Shapes from './Shapes';
import Button from '../ui/Button';
import features from '../../utils/features';

function signIn() {

	window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/auth/google`;
	
}

const target = { teams: 5000, projects: 25000, tasks: 50000 };

const Brandsection = () => {

	const [isLoaded, setLoaded] = useState(false);
	const [isVisible, setVisible] = useState(false);
	const [stats, setStats] = useState({ teams: 0, projects: 0, tasks: 0 });

	const statsSectionRef = useRef(null);

	const duration = 2000;
	const steps = 60;
	const stepsInterval = duration / steps;

	useEffect(() => {

		setLoaded(true);

	}, [])

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

		<main className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50'>

			<Shapes />

			{ /* Hero section */ }
			<section className='relative min-h-screen flex items-center justify-center px-4 overflow-hidden'>

				<div className='absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-transparent'></div>

				<div

					className={ `

						relative z-10 text-center max-w-6xl mx-auto transition-all duration-1000
						${ isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10' }

					` }

				>

					<h1

						className='

							text-3xl md:text-4xl lg:text-5xl
							font-bold mb-10
							bg-gradient-to-r from-slate-900 via-purple-800 to-blue-800
							bg-clip-text text-transparent
							leading-tight

						'

					>

						Smart-Desk Pro

					</h1>

					<h2

						className='

							text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-28 leading-tight

						'

					>

						Stay Focused, Get Things Done, Superfast
						
					</h2>

					<p

						className='

							text-xl md:text-2xl lg:text-3xl text-slate-600 mb-4 font-light

						'

					>

						Collaborative Task Management

					</p>

					<p

						className='

							text-lg md:text-xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed

						'

					>

						Help teams plan, track, and complete projects faster with real-time collaboration, intelligent automation,
						and intuitive project management tools.

					</p>

					<Button className='group' size='lgW' variant='signIn' onClick={ signIn }>

						<div className='flex items-center justify-center gap-2'>

							<svg className='w-5 h-5 transition-transform duration-500 group-hover:rotate-[365deg]' viewBox='0 0 24 24'>

								<path

									fill='#4285F4'
									d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'

								/>

								<path

									fill='#34A853'
									d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'

								/>

								<path

									fill='#FBBC05'
									d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'

								/>

								<path

									fill='#EA4335'
									d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'

								/>

							</svg>

							<span>Sign in with Google</span>

						</div>

					</Button>

				</div>

				<ScrollIndicator />

			</section>

			{ /* Statistics section */ }
			<section ref={statsSectionRef} className='px-4 py-20 bg-gradient-to-r from-purple-50 to-blue-50'>

				<div className='max-w-6xl mx-auto'>

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

			{ /* Features section */ }
			<section className='px-4 py-24'>

				<div className='max-w-6xl mx-auto'>

					<header className='text-center mb-16'>

						<h2

							className='

								text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6

							'

						>

							Powerful Features

						</h2>

						<p

							className='

								text-xl text-slate-600 max-w-3xl mx-auto

							'

						>

							Everything you need to manage projects efficiently and keep your team synchronized

						</p>

					</header>

					<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-8 list-none'>

						{ features.map((feature, i) => (

							<li key={ i }>

								<article

									className='

										relative h-full p-8 text-center transition-all duration-500 hover:-translate-y-3 bg-white border border-slate-200/50
										shadow-xl hover:shadow-2xl group overflow-hidden rounded-2xl

									'

								>

									<div

										className='

											absolute inset-0 bg-gradient-to-br from-purple-50/0 via-blue-50/0 to-purple-100/0 group-hover:from-purple-50/5
											group-hover:via-blue-50/30 group-hover:to-purple-100/50 transition-all duration-500

										'

									></div>

									<div className='relative z-10'>

										<figure className='mb-8 flex justify-center'>

											<div

												className='

													relative p-6 bg-gradient-to-br from-purple-100 via-blue-50 to-purple-50 rounded-3xl group-hover:scale-110
													group-hover:rotate-3 transition-all duration-500 shadow-lg

												'

											>

												<div className='text-purple-600 group-hover:text-purple-700 transition-colors duration-300'>

													<feature.icon className='w-8 h-8'/>

												</div>

												<div

													className='

														absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-3xl opacity-0
														group-hover:opacity-100 transition-opacity duration-500 blur-xl

													'

												></div>

											</div>

										</figure>

										<h3

											className='

												text-2xl text-slate-800 font-bold group-hover:text-slate-900 transition-colors duration-300 mb-6
											
											'

										>

											{ feature.title }

										</h3>

										<p

											className='

												text-slate-600 text-lg group-hover:text-slate-700 transition-colors duration-300 leading-relaxed

											'

										>

											{ feature.description }

										</p>

										<div

											className='

												absolute left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-20
												transition-all duration-500 rounded-full

											'

										></div>

									</div>

								</article>

							</li>

						)) }

					</ul>

				</div>
			
			</section>

			{ /* Call-to-Action section */ }
			<section>

				
				
			</section>

		</main>

	);

};

export default Brandsection;
