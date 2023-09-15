import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext'; // Adjusted the path
import Card from './Card';  // Adjusted the path to point to the correct Card.js file
import { AnimatePresence } from 'framer-motion';  // Removed the unused 'motion' import

const CardSection = () => {
    const { relaxationTechniques } = useContext(AppContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledTechniques, setShuffledTechniques] = useState([]);

    useEffect(() => {
        const flattenAndShuffle = (arr) => {
            let flatArr = arr.flatMap(subcategory => 
                subcategory.activities.map(activity => ({
                    ...activity, 
                    subCategoryName: subcategory.name,
                    mainCategoryName: "Relaxation Techniques"
                }))
            );
            
            for (let i = flatArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [flatArr[i], flatArr[j]] = [flatArr[j], flatArr[i]];
            }

            return flatArr;
        };

        setShuffledTechniques(flattenAndShuffle(relaxationTechniques));
    }, [relaxationTechniques]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledTechniques.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + shuffledTechniques.length) % shuffledTechniques.length);
    };

    return (
        <div className="flex items-center">
            <button onClick={handlePrev} className="p-4 bg-gray-300 rounded-md">Previous</button>
            <AnimatePresence>
                {shuffledTechniques.length > 0 && <Card key={currentIndex} activity={shuffledTechniques[currentIndex]} handleNext={handleNext} handlePrev={handlePrev} />}
            </AnimatePresence>
            <button onClick={handleNext} className="p-4 bg-gray-300 rounded-md">Next</button>
        </div>
    );
};

export default CardSection;
