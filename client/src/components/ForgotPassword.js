import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

const ResetSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Current password is required'),
    new_password: Yup.string().required('New password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const ForgotPassword = (props) => {
    const { resetPassword, userId } = useContext(AppContext);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);  // Indicate the start of the submission process
    
        resetPassword(values, userId)  // Use userId here
            .then(response => {
                setMessage('Password has been successfully reset.');
                actions.resetForm();  // Reset the form fields using actions
                actions.setSubmitting(false);  // Indicate the end of the submission process
            })
            .catch(error => {
                console.error('Error:', error);
                const errorMessage = error?.message || "An error occurred.";
                setError(errorMessage);
                actions.setSubmitting(false);  // Indicate the end of the submission process
            });
    };    


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            new_password: '',
            confirm_password: '',
        },
        validationSchema: ResetSchema,
        onSubmit: handleSubmit,
    });

    return (
        <motion.div 
            className="forgot-password"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
        >   
            <h1 className='mt-5'>Reset Password</h1>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-md">
                <form onSubmit={(event) => formik.handleSubmit(event, formik.values, formik.actions)} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                className="block w-full border-solid border-2 border-mattebrown rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:ring-mattebrown focus:border-mattebrown sm:text-sm"
                            />
                        </div>
                        {formik.touched.username && formik.errors.username ? (
                            <div className="error-message">{formik.errors.username}</div>
                        ) : null}
                    </div>
    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Current Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="block w-full border-solid border-2 border-mattebrown rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:ring-mattebrown focus:border-mattebrown sm:text-sm"
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error-message">{formik.errors.password}</div>
                        ) : null}
                    </div>
    
                    <div>
                        <label htmlFor="new_password" className="block text-sm font-medium leading-6 text-gray-900">
                            New Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="new_password"
                                name="new_password"
                                type="password"
                                value={formik.values.new_password}
                                onChange={formik.handleChange}
                                className="block w-full border-solid border-2 border-mattebrown rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:ring-mattebrown focus:border-mattebrown sm:text-sm"
                            />
                        </div>
                        {formik.touched.new_password && formik.errors.new_password ? (
                            <div className="error-message">{formik.errors.new_password}</div>
                        ) : null}
                    </div>
    
                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirm New Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                className="block w-full border-solid border-2 border-mattebrown rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:ring-mattebrown focus:border-mattebrown sm:text-sm"
                            />
                        </div>
                        {formik.touched.confirm_password && formik.errors.confirm_password ? (
                            <div className="error-message">{formik.errors.confirm_password}</div>
                        ) : null}
                    </div>
    
                    {!formik.isSubmitting && (
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mattecoal hover:bg-mattebrown focus:outline-none focus:ring-2 focus:ring-mattecoal"
                        >
                            Reset Password
                        </motion.button>
                    )}
                </form>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <button type="button" onClick={props.onBackToLogin} className="mt-4">
                    Back to Login
                </button>
            </div>
        </motion.div>
    )       
}

export default ForgotPassword;