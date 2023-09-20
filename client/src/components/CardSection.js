import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import Card from './Card'; 
import { AnimatePresence } from 'framer-motion'; 

const CardSection = () => {
    const { relaxationTechniques } = useContext(AppContext);
    const [currentIndex, setCurrentIndex] = useState(2);
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

    const getCardIndices = (centerIndex) => {
        let indices = [];
        for (let i = -2; i <= 2; i++) {
            indices.push((centerIndex + i + shuffledTechniques.length) % shuffledTechniques.length);
        }
        return indices;
    };

    const cardIndices = getCardIndices(currentIndex);

    return (
        <div className="relative w-full flex justify-center items-center h-full mt-20">
            <div className="flex justify-center">
                <AnimatePresence>
                    {shuffledTechniques.length > 0 && cardIndices.map((index, i) => (
                        <Card 
                            key={index}
                            activity={shuffledTechniques[index]}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            style={{
                                position: 'relative',
                                transform: `translateX(${(i - 2) * 80}px) rotate(${(i - 2) * 15}deg)`,
                                zIndex: i,
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
    
};

export default CardSection;
