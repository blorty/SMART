import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5555/categories")
            .then((response) => {
                if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Failed to fetch categories:", error);
                console.error("Error message:", error.message);
            });
        }, []);
        
        useEffect(() => {
            fetch("http://localhost:5555/activities")
            .then((response) => {
                if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setActivities(data);
            })
            .catch((error) => {
                console.error("Failed to fetch activities:", error);
                console.error("Error message:", error.message);
            });
        }, []);
    
    

    return (
        <AppContext.Provider 
        value={{
            categories,
            activities,
            error
        }}>
            {children}
        </AppContext.Provider>
    );
}
