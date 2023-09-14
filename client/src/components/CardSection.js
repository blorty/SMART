import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext'; // Adjust the path as necessary
import Card from './Card'; // Adjust the path as necessary

const CardSection = () => {
    const { relaxationTechniques } = useContext(AppContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % relaxationTechniques.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + relaxationTechniques.length) % relaxationTechniques.length);
    };

    return (
        <div className="flex items-center">
            <button onClick={handlePrev} className="p-4 bg-gray-300 rounded-md">Left</button>
            {relaxationTechniques.length > 0 && <Card activity={relaxationTechniques[currentIndex]} />}
            <button onClick={handleNext} className="p-4 bg-gray-300 rounded-md">Right</button>
        </div>
    );
};

export default CardSection;
