import { motion, AnimatePresence } from 'framer-motion';
interface Props {
    isVisible: boolean;
}
const languages = ['JP', 'EN'];
export const DropDown = ({ isVisible }: Props) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={
                        'bg-zinc-700 flex flex-col absolute p-2 rounded-sm'
                    }>
                    {languages.map((el) => (
                        <span key={el}>{el}</span>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
