import features from '../../../utils/features';

const Features = () => (
        
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

);

export default Features;
