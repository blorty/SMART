
import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

import defaultavatar from '../assets/defaultavatar.png';

const UpdateUsernameSchema = Yup.object().shape({
    newUsername: Yup.string().required('New username is required'),
});

const UserDashboard = () => {
    const { updateUsername, user, updateAvatar } = useContext(AppContext);
    const [isAvatarHovered, setIsAvatarHovered] = useState(false); 
    const fileInputRef = useRef(null);
    const [error, setError] = useState(null);

    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && user) {
            updateAvatar(user.username, file)
                .then(response => {
                    // Handle success if needed
                })
                .catch(error => {
                    console.error("Failed to update avatar:", error);
                });
        }
    };

    const handleSubmit = (values) => {
        updateUsername(values)
            .catch((error) => {
                console.error('Error:', error);
                const errorMessage = error?.message || "An error occurred while updating the username.";
                setError(errorMessage);
            });
    };

    const formik = useFormik({
        initialValues: {
            email: user.email,
            newUsername: user.username,
            newAvatar: null, 
        },
        validationSchema: UpdateUsernameSchema,
        onSubmit: handleSubmit,
    });

    return (
        <motion.div 
        className="user-dashboard"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
    >   
        <h1 className="text-2xl font-bold text-center mb-4">User Dashboard</h1>

        <div className="flex justify-center items-center mb-4">
        <motion.img
            whileHover={{ scale: 1.05, opacity: 0.9 }}
            src={user.avatar || defaultavatar} // Use the default avatar if user.avatar is not available
            alt="User Avatar" 
            className={`rounded-full w-40 h-40 object-cover ${isAvatarHovered ? "opacity-50" : ""}`}
            onClick={() => fileInputRef.current.click()}
        />

        </div>

        {/* Displaying Email and Username */}
        <div className="text-center mb-4 space-y-4 ">
            <p className="text-lg mb-1"><span className="font-semibold">Email:</span> {user.email}</p>
            <p className="text-lg"><span className="font-semibold">Username:</span> {user.username}</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-gray-500 rounded-md p-4">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="newUsername" className="block text-sm font-medium leading-6 text-gray-900">
                                New Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="newUsername"
                                    name="newUsername"
                                    type="text"
                                    value={formik.values.newUsername}
                                    onChange={formik.handleChange}
                                    className="block w-full border-solid border-2 border-indigo-600 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            {formik.touched.newUsername && formik.errors.newUsername ? (
                                <div className="error-message">{formik.errors.newUsername}</div>
                            ) : null}
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mattecoal hover:bg-mattebrown focus:outline-none focus:ring-2 focus:ring-mattecoal"
                        >
                            Update Username
                        </motion.button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange}
                />
                </div>
        </motion.div>
    )
}

export default UserDashboard;
