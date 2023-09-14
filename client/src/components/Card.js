import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ activity, mainCategoryName }) => {
    return (
        <motion.div 
            className="bg-black text-white p-4 rounded-lg shadow-lg flex flex-col justify-between w-72 h-96 m-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
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
