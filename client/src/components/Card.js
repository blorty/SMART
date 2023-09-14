import React from 'react';
import { motion } from "framer-motion";
import { Carousel } from 'react-responsive-carousel';

const Card = ({ activity = {} }) => {
    console.log('Activity in Card:', activity); // Add this line
    const { name = "Default name", description = "Default Description", category_name = "Default Category", sub_category = "Default Sub-Category" } = activity;

    return (
        <Carousel>
            <motion.div
                className="w-60 h-80 bg-white p-4 rounded-md shadow-md flex flex-col justify-between"
                whileHover={{ scale: 1.05 }}
            >
                <h2 className="text-xl font-bold">{sub_category}</h2>
                <h1 className="text-lg font-semibold">{name}</h1>
                <p className="text-l text-gray-700">{description}</p>
                <p className="text-sm text-gray-500">Category: {category_name}</p>
            </motion.div>
        </Carousel>
    );
};

export default Card;
