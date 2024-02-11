import { motion } from 'framer-motion';

export const MainText = () => {
    const variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 1.2,
            },
        },
    };
    return (
        <motion.div
            variants={variants}
            animate='animate'
            initial='initial'
            className='absolute top-44 '>
            <h1 className=' text-5xl font-microma'>
                Hi <span className='text-fuchsia-600'>I</span>'m
            </h1>
            <h1 className='text-5xl font-microma'>David Encarnacion</h1>
            <h2 className='text-sm font-microma text-right'>
                Full stack web developer & Game developer
            </h2>
        </motion.div>
    );
};
