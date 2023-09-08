import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//auth imports
import { useContext } from 'react';
import { AuthContext } from './UserContext';


const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  
  const Register = () => {
    const { createUser } = useContext(AuthContext);  // Import other context values
    const [error, setError] = useState(null);
  
    const handleSubmit = (values) => {
      createUser(values)
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
        <div className="register" >
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
                    </div>
                    {!formik.isSubmitting && (
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Join Now
                    </button>
                    )}
                </form>
                {error && <p className="error-message">{error}</p>}
                </div>
        </div>
    )
}

export default Register;