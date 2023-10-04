import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [relaxationTechniques, setRelaxationTechniques] = useState([]);
    const [stressManagementActivities, setStressManagementActivities] = useState([]);
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatarFetched, setAvatarFetched] = useState(false);



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


    const login = (values) => {
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
            console.log("Saving Token to LocalStorage:", userData.token);
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


    const register = (values) => {
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


    const logout = () => {
        fetch('http://localhost:5555/logout', {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUser(null);
            navigate('/');
        })
        
        .catch(error => {
            console.error('Failed to log out: ', error);
        });
    };


    const resetPassword = (values) => {
        console.log("Attempting to reset password with values:", values);
        return fetch(`http://localhost:5555/user/${values.username}/password`, {  // Use username in the URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials: 'include',
        })
        .then(response => {
            console.log("Received response from server:", response);
    
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message || 'Failed to reset password.'));
            }
            return response.json();
        })
        .catch(error => {
            console.error('Reset Password Error:', error);
            throw new Error(error);
        });
    };    


    const fetchUserAvatar = useCallback((username) => {
        return fetch(`http://localhost:5555/user/${username}/avatar`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message || 'Failed to fetch avatar.'));
            }
            return response.json();
        })
        .then(avatarData => {
            const prefix = "data:image/png;base64,";
            const avatarURL = avatarData.avatar.startsWith(prefix) ? avatarData.avatar : prefix + avatarData.avatar;
            setUser(user => ({ ...user, avatar: avatarURL }));
        })
        .catch(error => {
            console.error('Fetch Avatar Error:', error);
            throw new Error(error);
        });
    }, [setUser]);


    useEffect(() => {
        if (user && user.username && !avatarFetched) {
            fetchUserAvatar(user.username);
            setAvatarFetched(true);  // Set the flag after fetching
        }
    }, [user, fetchUserAvatar]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:5555/verify_token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            .then(response => {
                if (response.status === 401) {
                    throw new Error('Token is unauthorized');
                }
                if (!response.ok) {
                    throw new Error('Token verification failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.valid) {
                    setIsLoggedIn(true);
                    // Optionally, you can also set the user data here
                    setUser(data.user);
                } else {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch(error => {
                console.error('Token verification error:', error);
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setUser(null);
            });
        }
    }, [fetchUserAvatar]);      


    const updateAvatar = (username, avatarFile) => {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        
        return fetch(`http://localhost:5555/user/${username}/avatar`, {
            method: 'PUT',
            body: formData,
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message || 'Failed to update avatar.'));
            }
            return response.json();
        })
        .then(data => {
            // Avatar update successful. Fetch the updated avatar.
            return fetchUserAvatar(username);
        })
        .catch(error => {
            console.error('Update Avatar Error:', error);
            throw new Error(error);
        });
    };    


    const forgotUsername = (email) => {
        return fetch('http://localhost:5555/user/forgot-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message || 'Failed to retrieve username.'));
            }
            return response.json();
        })
        .catch(error => {
            console.error('Forgot Username Error:', error);
            throw new Error(error);
        });
    };


    return (
        <AppContext.Provider value={{ 
            relaxationTechniques, stressManagementActivities, user, setIsLoggedIn, 
            isLoggedIn, login, register, logout, authError, setAuthError, 
            resetPassword, forgotUsername, updateAvatar
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
