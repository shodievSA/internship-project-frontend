import AnimateOnScroll from '../Visuals/AnimateOnScroll';

const Footer = () => (

    <footer className='px-4 py-12 bg-slate-900'>

        <div className='max-w-6xl mx-auto'>

            <div className='flex flex-col md:flex-row items-center justify-between'>

                <AnimateOnScroll>

                    <div

                        className='mb-0 sm:mb-12 xs:mb-14 xss:mb-12 text-center'
                        data-aos='fade-up'

                    >

                        <h3

                            className='

                                text-2xl font-bold bg-gradient-to-t from-purple-400 to-blue-400 bg-clip-text text-transparent

                            '

                        >

                            Smart-Desk Pro

                        </h3>
                        <p className='text-slate-400 mt-2'>Collaborative Task Management</p>

                    </div>

                </AnimateOnScroll>

                <nav

                    className='

                        flex space-x-8 text-center xss:space-x-0 xss:space-y-2 xss:grid xss:grid-cols-1 xss:place-items-center
                        md:space-x-0 md:grid md:grid-cols-2 md:space-y-4 md:place-items-baseline md:place-content-end lg:flex lg:space-x-8

                    '

                >

                    <AnimateOnScroll>

                        <a

                            className='text-slate-400 hover:text-white transition-colors duration-300'
                            href="#features"
                            data-aos='fade-up'

                        >

                            Our Features

                        </a>

                    </AnimateOnScroll>

                    <AnimateOnScroll>

                        <a
                        
                            className='text-slate-400 hover:text-white transition-colors duration-300'
                            href="#statistic"
                            data-aos='fade-up'

                        >

                            Smart-Desk Pro in Numbers

                        </a>

                    </AnimateOnScroll>

                    <AnimateOnScroll>

                        <a

                            className='text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer'
                            data-aos='fade-up'

                        >

                            Terms

                        </a>

                    </AnimateOnScroll>

                    <AnimateOnScroll>

                        <a

                            className='text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer'
                            data-aos='fade-up'

                        >

                            Privacy Policy

                        </a>

                    </AnimateOnScroll>

                    <AnimateOnScroll>

                        <a

                            className='text-slate-400 hover:text-white transition-colors duration-300'
                            href="mailto:notifications.smartdeskpro@gmail.com"
                            data-aos='fade-up'

                        >

                            Contact
                            
                        </a>

                    </AnimateOnScroll>

                </nav>

            </div>

            <AnimateOnScroll>

                <div
                
                    className='text-slate-400 text-center border-t border-slate-800 mt-8 pt-8'
                    data-aos='fade-left'

                >

                    <small>&copy; 2025 Smart-Desk Pro. All rights reserved</small>

                </div>

            </AnimateOnScroll>

        </div>

    </footer>

);

export default Footer;
