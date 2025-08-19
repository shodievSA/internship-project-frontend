import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AnimateOnScroll = ({ children }) => {

    useEffect(() => {

        AOS.init({ 

            duration: 1000,
            once: false,
            mirror: true,
            disable: 'mobile',
            easing: 'ease-out',
            offset: 100,
            delay: 0,
            startEvent: 'DOMContentLoaded',
            anchorPlacement: 'top-bottom',

        });

    }, [])

    return <>{ children }</>;

}

export default AnimateOnScroll;
