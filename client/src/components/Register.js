import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';


const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Register = () => {
    const navigate = useNavigate();
    const { register } = useContext(AppContext);
    const [error, setError] = useState(null);

    const handleSubmit = (values) => {
        register(values, navigate)
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
            });
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: handleSubmit,
    });

    return (
        <motion.div 
            className="register"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
        >   
            <h1>Register</h1>
            <br />
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-500 rounded-md">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                className="block w-full border-solid border-2 border-indigo-600 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        {formik.touched.username && formik.errors.username ? (
                            <div className="error-message">{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="block w-full border-solid border-2 border-indigo-600 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error-message">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div>
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
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error-message">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    {!formik.isSubmitting && (
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mattecoal hover:bg-mattebrown focus:outline-none focus:ring-2 focus:ring-mattecoal"
                        >
                            Join Now
                        </motion.button>
                    )}
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </motion.div>
    )
}

export default Register;