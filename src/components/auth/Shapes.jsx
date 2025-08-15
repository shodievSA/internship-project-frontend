const Shapes = () => (

    <div className='fixed inset-0 overflow-hidden pointer-events-none -z-1'>

        <div

            className='

                absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full
                opacity-20 animate-floatLarge

            '

        ></div>

        <div

            className='

                absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full
                opacity-30 animate-float-delayed

            '

        ></div>

        <div

            className='

                absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full
                opacity-15 animate-float-slowed

            '

        ></div>

    </div>

);

export default Shapes;
