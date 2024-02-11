import { motion } from 'framer-motion';
import { useState } from 'react';
import { DropDown } from './DropDown';

export const DropDownLanguageButton = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    return (
        <div className='flex gap-2'>
            <span>Language: </span>
            <div className='relative'>
                <button onClick={() => setIsVisible(!isVisible)}>ES</button>
                <DropDown isVisible={isVisible} />
            </div>
        </div>
    );
};
