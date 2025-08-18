import { Shapes } from '../Visuals/Shapes';
import { Hero, Features, Stats, CallToAction } from '../Sections';

const Main = () => (

	<main className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50'>

		<Shapes/>
		<Hero/>
		<Stats/>
		<Features/>
		<CallToAction/>

	</main>

);

export default Main;
