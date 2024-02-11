import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

const themes: string[] = ['dark', 'light'];

export const ThemeSwitcher = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [theme, setTheme] = useState<string | null>(() => {
        if (
            typeof localStorage !== 'undefined' &&
            localStorage.getItem('theme')
        ) {
            return localStorage.getItem('theme');
        }
        return 'dark';
    });

    const handleChange = () => {
        const t = theme === 'light' ? 'dark' : 'light';
        setTheme(t);
        localStorage.setItem('theme', t);
    };

    useEffect(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'light') {
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
        }
    }, [theme]);

    const itemVariants = {
        hidden: { opacity: 0, y: -200 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: '.4', type: 'spring', stiffness: 100 },
        },
    };

    return isLoading ? (
        <div className='relative'>
            {themes.map((el) => (
                <motion.button
                    whileTap={{ scale: 1.1 }}
                    animate={el === theme ? 'animate' : 'hidden'}
                    variants={itemVariants}
                    onClick={handleChange}
                    key={el}
                    className={`rounded-sm  bg-orange-500 p-2  ${
                        el === theme ? 'block' : 'absolute'
                    }`}>
                    {el === 'dark' ? <IoMoonOutline /> : <IoSunnyOutline />}
                </motion.button>
            ))}
        </div>
    ) : (
        <div></div>
    );
};
