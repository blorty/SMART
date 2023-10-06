import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword'; 

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'), 
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AppContext);
    const [error, setError] = useState(null);
    const [modalContent, setModalContent] = useState('login');

    const handleSubmit = (values) => {
        login(values, navigate)
            .catch((error) => {
                console.error('Error:', error);
                const errorMessage = error?.message || "An error occurred during login.";
                setError(errorMessage);
            });
    };

    const formik = useFormik({
        initialValues: {
            username: '', 
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: handleSubmit,
    });

    return (
        <motion.div 
                className="login"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
            >   
                <h1>Login</h1>
                <br />
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-500 rounded-md">
                    {modalContent === 'login' && (
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {modalContent === 'login' && (
                        <>
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
                                    className="block w-full border-solid border-2 border-indigo-600 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <div className="error-message">{formik.errors.username}</div>
                                ) : null}
                            </div>
    
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className="block w-full border-solid border-2 border-indigo-600 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="error-message">{formik.errors.password}</div>
                                ) : null}
                            </div>
    
                            <div className="text-center my-2">
                                <button 
                                    type="button"
                                    className="text-indigo-600 hover:underline"
                                    onClick={() => setModalContent('forgotPassword')}
                                >
                                    Forgot Password?
                                </button>
                            </div>
    
                            {!formik.isSubmitting && (
                                <motion.button 
                                whileHover={{ scale: 1.05 }}
                                type="submit"
                                disabled={formik.isSubmitting}  // Disable button during form submission
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mattecoal hover:bg-mattebrown focus:outline-none focus:ring-2 focus:ring-mattecoal ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {formik.isSubmitting ? 'Logging in...' : 'Login'}
                            </motion.button>
                            )}
                        </>
                    )}
    
    </form>
            )}

            {modalContent === 'forgotPassword' && <ForgotPassword onBackToLogin={() => setModalContent('login')} />}
            
            {error && <p className="error-message">{error}</p>}
        </div>
    </motion.div>
);
}    

export default Login;