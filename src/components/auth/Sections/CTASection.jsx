import Button from '../../ui/Button';
import { icons } from '../../icons/index';
import GoogleIcon from '../../ui/Google';

function signIn() {

	window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/auth/google`;
	
}

const CallToAction = () => (
        
	<section className='relative px-4 py-24 bg-gradient-to-r from-purple-600 via-purple-700 to-blue-700 overflow-hidden'>

		<div className='absolute inset-0 opacity-10'>

			<div

				className='absolute inset-0'

				style={

					{ 

						backgroundImage: `
									url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
						`,

					}

				}

			>
			</div>

		</div>

		<div className='relative max-w-4xl mx-auto text-center z-10'>

			<h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>Ready to Transform Your Team's Productivity?</h2>
			<p

				className='

					text-xl text-purple-100 mb-12 max-w-2xl mx-auto

				'

			>

				Join thousands of teams already using Smart-Desk Pro to streamline their workflow and achieve better results.

			</p>

			<Button className='group' size='xlW' variant='signInSec' onClick={ signIn }>

				<div className='flex items-center justify-around h-full'>

					<GoogleIcon original={ false }/>

					<span>Get Started with Google</span>

					<icons.ArrowRight className='w-5 h-5 ml-2'/>

				</div>

			</Button>

		</div>
		
	</section>
    
);

export default CallToAction;
