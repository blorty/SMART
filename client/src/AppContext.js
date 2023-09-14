import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [relaxationTechniques, setRelaxationTechniques] = useState([]);
    const [stressManagementActivities, setStressManagementActivities] = useState([]);

    useEffect(() => {
        // Fetch Relaxation Techniques
        fetch('http://localhost:5555/relaxation_techniques')
            .then(response => response.json())
            .then(data => setRelaxationTechniques(data))
            .catch(error => console.error('Error fetching relaxation techniques:', error));
    }, []);

    useEffect(() => {
        // Fetch Stress Management Activities
        fetch('http://localhost:5555/stress_management_activities')
            .then(response => response.json())
            .then(data => setStressManagementActivities(data))
            .catch(error => console.error('Error fetching stress management activities:', error));
    }, []);

    return (
        <AppContext.Provider value={{ relaxationTechniques, stressManagementActivities }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
