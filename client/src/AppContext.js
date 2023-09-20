import React, { createContext, useState, useEffect } from 'react';


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [relaxationTechniques, setRelaxationTechniques] = useState([]);
    const [stressManagementActivities, setStressManagementActivities] = useState([]);

    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


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


    const login = (values, history) => {
        return fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials: 'include',  // Send cookies
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message));
            }
            return response.json();
        })
        .then(userData => {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('user', JSON.stringify(userData.user));
            setIsLoggedIn(true);
            setUser(userData.user);
            fetchTeams(); // fetch teams after logging in
            history.push('/dashboard');
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
    };


    const register = (values, history) => {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials: 'include',  // Send cookies
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message));
            }
            return response.json();
        })
        .then(userData => {
            // Don't log the user in immediately after registering
            // Instead, redirect them to the login page
            history.push('/login');
        })
        .catch(error => {
            setAuthError(error);
        });
    };


    const logout = (history) => {
        fetch('/logout', {
            method: 'POST',
            credentials: 'include',  // Send cookies
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message));
            }
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            setUser(null);
            history.push('/');
        })
        .catch(error => {
            console.error('Failed to log out: ', error);
        });
    };


    return (
        <AppContext.Provider value={{ 
            relaxationTechniques, stressManagementActivities,user, setIsLoggedIn, 
            isLoggedIn, login, register, logout, authError, setAuthError,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
