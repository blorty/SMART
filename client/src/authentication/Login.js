import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid username').required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

const Login = ({ onLogin }) => {

    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            onLogin(values.email, values.password);
        },
    });
    
    return (
        <div className="login">
            <h1>Login</h1>
            <br />
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Email
            </label>
            <div className="mt-2">
            <input
                id="email"
                name="email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="block w-full border-solid border-2 border-indigo-600 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            </div>
        </div>

        <div>
            <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
            </label>
            </div>
            <div className="mt-2">
            <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="block w-full border-solid border-2 border-indigo-600 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            </div>
        </div>

        <div>
            <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-transparent"
            >
            Submit
            </button>
        </div>
        </form>

        </div>
    )
}

export default Login;