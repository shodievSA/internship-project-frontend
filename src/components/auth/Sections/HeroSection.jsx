import { useState, useEffect } from 'react';
import Button from '../../ui/Button';
import { ScrollIndicator } from '../Visuals/ScrollIndicator';
import GoogleIcon from '../../ui/Google';

function signIn() {

	window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/auth/google`;
	
}

const Hero = () => {

    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {

        setLoaded(true);

    }, [])

    return (
        
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

                <Button className='group' size='lgW' variant='signInPr' onClick={ signIn }>

                    <div className='flex items-center justify-center gap-2'>

                        <GoogleIcon/>

                        <span>Sign in with Google</span>

                    </div>

                </Button>

            </div>

            <ScrollIndicator />

        </section>

    );

}

export default Hero;
