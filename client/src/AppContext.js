import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [relaxationTechniques, setRelaxationTechniques] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/categories')
            .then((res) => res.json())
            .then((data) => {
                console.log('Categories:', data); // Add this line
                setCategories(data);
            })
            .catch((err) => console.error('Failed to fetch categories:', err));
    }, []);
    
    useEffect(() => {
        if (categories.length === 0) return;
    
        fetch('http://127.0.0.1:5555/activities')
            .then((res) => res.json())
            .then((data) => {
                console.log('Activities:', data); // Add this line
                if (!Array.isArray(data)) {
                    console.error('Data is not an array', data);
                    return;
                }
                const updatedData = data.map((activity) => {
                    const category = categories.find(
                        (category) => category.id === activity.category_id,
                    );
                
                    const parentCategory = categories.find(
                        (category) => category.id === category?.parent_id
                    );
                
                    return {
                        ...activity,
                        category_name: category ? category.name : 'Unknown category',
                        sub_category: parentCategory ? parentCategory.name : 'Unknown parent category',
                    };
                });                
                console.log('Updated data:', updatedData); // Add this line
                setActivities(updatedData);
            })
            .catch((err) => console.error('Failed to fetch activities:', err));           
    }, [categories]);
    
    // fetch relaxation techniques only
    useEffect(() => {
        fetch('http://127.0.0.1:5555/relaxation-techniques')
            .then((res) => res.json())
            .then((data) => {
                console.log('Relaxation Techniques:', data);
                setRelaxationTechniques(data);
            })
            .catch((err) => console.error('Failed to fetch relaxation techniques:', err));
    }, []);

    return (
        <AppContext.Provider value={{ activities, categories, relaxationTechniques }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
