import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext'; // Adjusted the path
import Card from './Card';  // Adjusted the path to point to the correct Card.js file
import { AnimatePresence } from 'framer-motion';  // Removed the unused 'motion' import

const CardSection = () => {
    const { relaxationTechniques } = useContext(AppContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    const flattenedRelaxationTechniques = relaxationTechniques.flatMap(subcategory => 
        subcategory.activities.map(activity => ({
            ...activity, 
            subCategoryName: subcategory.name,
            mainCategoryName: "Relaxation Techniques"
        }))
    );

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flattenedRelaxationTechniques.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flattenedRelaxationTechniques.length) % flattenedRelaxationTechniques.length);
    };

    return (
        <div className="flex items-center justify-center margin-auto">
            <button onClick={handlePrev} className="p-4 bg-gray-300 rounded-md">Previous</button>
            <AnimatePresence>
                {flattenedRelaxationTechniques.length > 0 
                    && 
                        <Card key={currentIndex} activity={flattenedRelaxationTechniques[currentIndex]} 
                        handleNext={handleNext} handlePrev={handlePrev} />}
            </AnimatePresence>
            <button onClick={handleNext} className="p-4 bg-gray-300 rounded-md">Next</button>
        </div>
    );
};

export default CardSection;
