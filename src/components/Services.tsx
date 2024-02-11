import { motion } from 'framer-motion';
export const Services = () => {
    return (
        <div className='mt-16'>
            <h2 className='text-2xl mb-8'>What can i do</h2>
            <div className='grid grid-cols-3 gap-4 '>
                <div className='rounded-md p-8 dark:bg-white/5 bg-white/40 shadow-lg backdrop-blur-xl'>
                    <h3 className='text-xl text-center mb-4'>3D</h3>
                    <p>
                        "Apasionado del 3D, convierto ideas en realidades
                        visuales con habilidades básicas pero creatividad
                        ilimitada."
                    </p>
                </div>
                <div className='dark:bg-white/5 bg-white/40 shadow-lg backdrop-blur-xl p-8 rounded-md'>
                    <h3 className='text-center mb-4'>UI/UX</h3>
                    <p>
                        "Exploro el fascinante mundo del diseño UI/UX,
                        fusionando estética y funcionalidad para crear
                        experiencias digitales intuitivas.
                    </p>
                </div>
                <div className='dark:bg-white/5 bg-white/40 shadow-lg backdrop-blur-xl p-8 rounded-md'>
                    <h3 className='text-center mb-4'>Web Developer</h3>
                    <p>
                        "Desarrollador web apasionado, convierto código en
                        experiencias digitales sorprendentes."
                    </p>
                </div>
            </div>
        </div>
    );
};
