import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext'; // Adjusted the path
import Card from './Card';

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
        <div className="flex items-center">
            <button onClick={handlePrev} className="p-4 bg-gray-300 rounded-md">Previous</button>
            {flattenedRelaxationTechniques.length > 0 && <Card activity={flattenedRelaxationTechniques[currentIndex]} />}
            <button onClick={handleNext} className="p-4 bg-gray-300 rounded-md">Next</button>
        </div>
    );
};

export default CardSection;
