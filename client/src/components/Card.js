import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const Card = ({ activity, mainCategoryName, handleNext, handlePrev }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], { clamp: false });

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 150) {
            handleNext();
        } else if (info.offset.x < -150) {
            handlePrev();
        }
    };

    return (
        <motion.div 
            className="bg-black text-white p-4 rounded-lg shadow-lg flex flex-col justify-between w-72 h-96 m-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{ x, rotate }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}  // Added the onDragEnd event handler
        >
            <div>
                <h2 className="text-xl font-bold mb-2">{activity.name}</h2>
                <p className="text-sm">{activity.description}</p>
            </div>
            <div>
                <p className="text-xs italic">{mainCategoryName}</p>
            </div>
        </motion.div>
    );
};

export default Card;
