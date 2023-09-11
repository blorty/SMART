import React from 'react';
import { motion } from "framer-motion";

const Card = ({ activity = {} }) => {
    const { title = "Default Title", description = "Default Description", duration = "Default Duration" } = activity;

    return (
        <motion.div
            className="w-60 h-80 bg-white p-4 rounded-md shadow-md flex flex-col justify-between"
            whileHover={{ scale: 1.05 }}
        >
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-700">{description}</p>
            <p className="text-sm text-gray-500">Duration: {duration}</p>
        </motion.div>
    );
};


export default Card;
