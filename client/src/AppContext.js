import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [relaxationTechniques, setRelaxationTechniques] = useState([]);
    const [stressManagementActivities, setStressManagementActivities] = useState([]);
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const loggedIn = Cookies.get('isLoggedIn');
        const userCookie = Cookies.get('user');
        
        if (token) {
            // If there's a token in local storage, verify its validity with the backend
            fetch('http://localhost:5555/verify_token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Token verification failed");
                }
                return response.json();
            })
            .then(data => {
                if (data.valid && loggedIn && userCookie && userCookie !== 'undefined') {
                    try {
                        const parsedUser = JSON.parse(userCookie);
                        setIsLoggedIn(true);
                        setUser(parsedUser);
                    } catch (e) {
                        console.error("Error parsing user cookie:", e.message);
                    }
                } else {
                    // Token is invalid or expired, clear local storage and cookies
                    localStorage.removeItem('token');
                    Cookies.remove('isLoggedIn');
                    Cookies.remove('user');
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch(error => {
                console.error('Token verification error:', error);
                localStorage.removeItem('token');
                Cookies.remove('isLoggedIn');
                Cookies.remove('user');
                setIsLoggedIn(false);
                setUser(null);
            });
        }
    
    }, []);
    


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


    const login = (values, navigate) => {
        return fetch('http://localhost:5555/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            }),
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data));
            }
            return response.json();
        })
        .then(userData => {
            Cookies.set('isLoggedIn', true);
            Cookies.set('user', JSON.stringify(userData.user));
            setIsLoggedIn(true);
            setUser(userData.user);
            localStorage.setItem('token', userData.token);
        })
        .catch(error => {
            console.error('Login Error:', error);
            const errorMessage = error?.message || error?.error || "An error occurred during login.";
            setAuthError(errorMessage);
            throw new Error(errorMessage);
        });
    };       


    const register = (values, navigate) => {
        fetch('http://localhost:5555/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message));
            }
            return response.json();
        })
        .then(userData => {
            setIsLoggedIn(true);
            setUser(userData.user);
            navigate('/');
        })
        .catch(error => {
            setAuthError(error);
        });
    };


    const logout = (navigate) => {
        fetch('http://localhost:5555/logout', {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message));
            }
            localStorage.removeItem('token');
            Cookies.remove('isLoggedIn');
            Cookies.remove('user');
            setIsLoggedIn(false);
            setUser(null);
            navigate('/');
        })
        .catch(error => {
            console.error('Failed to log out: ', error);
        });
    };
    


    return (
        <AppContext.Provider value={{ 
            relaxationTechniques, stressManagementActivities, user, setIsLoggedIn, 
            isLoggedIn, login, register, logout, authError, setAuthError, 
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
