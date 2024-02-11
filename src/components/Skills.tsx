import {
    SiTailwindcss,
    SiTypescript,
    SiAstro,
    SiMongodb,
    SiCplusplus,
    SiPrisma,
} from 'react-icons/si';
import { FaReact, FaFigma, FaHtml5 } from 'react-icons/fa';
import { IoLogoCss3, IoLogoNodejs } from 'react-icons/io5';
import { RiBlenderLine } from 'react-icons/ri';

export const Skills = () => {
    return (
        <div className='grid grid-cols-4 gap-4'>
            <SiTailwindcss size={24} />
            <FaReact size={24} />
            <RiBlenderLine size={24} />
            <FaFigma size={24} />
            <SiTypescript size={24} />
            <SiAstro size={24} />
            <FaHtml5 size={24} />
            <IoLogoCss3 size={24} />
            <IoLogoNodejs size={24} />
            <SiMongodb size={24} />
            <SiCplusplus size={24} />
            <SiPrisma size={24} />
        </div>
    );
};
