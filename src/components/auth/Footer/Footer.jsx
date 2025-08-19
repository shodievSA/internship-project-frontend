const Footer = () => (

    <footer className='px-4 py-12 bg-slate-900'>

        <div className='max-w-6xl mx-auto'>

            <div className='flex flex-col md:flex-row items-center justify-between'>

                <div className='mb-0 md:mb-0'>

                    <h3

                        className='

                            text-2xl font-bold bg-gradient-to-t from-purple-400 to-blue-400 bg-clip-text text-transparent

                        '

                    >

                        Smart-Desk Pro

                    </h3>
                    <p className='text-slate-400 mt-2'>Collaborative Task Management</p>

                </div>

                <div className='flex text-sm space-x-8'>

                    <a

                        className='text-slate-400 hover:text-white transition-colors duration-300'
                        href="#features"

                    >

                        Our Features

                    </a>

                    <a
                    
                        className='text-slate-400 hover:text-white transition-colors duration-300'
                        href="#statistics"

                    >

                        Smart-Desk Pro in Numbers

                    </a>

                    <a

                        className='text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer'

                    >

                        Terms

                    </a>

                    <a

                        className='text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer'

                    >

                        Privacy Policy

                    </a>

                    <a

                        className='text-slate-400 hover:text-white transition-colors duration-300'
                        href="mailto:notifications.smartdeskpro@gmail.com"

                    >

                        Contact
                        
                    </a>

                </div>

            </div>

            <div className='text-slate-400 text-center border-t border-slate-800 mt-8 pt-8'>

                <p>&copy; 2025 Smart-Desk Pro. All rights reserved.</p>

            </div>

        </div>

    </footer>

);

export default Footer;
