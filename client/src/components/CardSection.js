import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext'; // Adjust the path as necessary
import Card from './Card'; // Adjust the path as necessary

const CardSection = () => {
    const { activities } = useContext(AppContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + activities.length) % activities.length);
    };

    return (
        <div className="flex items-center">
            <button onClick={handlePrev} className="p-4 bg-gray-300 rounded-md">Left</button>
            {activities.length > 0 && <Card activity={activities[currentIndex]} />}
            <button onClick={handleNext} className="p-4 bg-gray-300 rounded-md">Right</button>
        </div>
    );
    
};

export default CardSection;
