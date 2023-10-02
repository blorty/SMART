import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: "100vh", transition: { duration: 0.3, ease: "easeInOut" } },
};


const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7 },
    exit: { opacity: 0 },
};

const Modal = ({ isOpen, close, children }) => {
    return (
        <AnimatePresence>
        {isOpen && (
            <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
            {/* Background Overlay */}
            <motion.div
                className="fixed bg-black w-full h-full"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayVariants}
                onClick={close}
            ></motion.div>

            {/* Modal Box */}
            <motion.div
                className="bg-lightsalmon p-8 rounded-lg shadow-2xl z-10 w-4/5 lg:w-1/3  md:w-1/2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
            >
                <button onClick={close} className="absolute top-2 right-2 text-lg">×</button>
                {children}
            </motion.div>
            </div>
        )}
        </AnimatePresence>
    );
};

export default Modal;
