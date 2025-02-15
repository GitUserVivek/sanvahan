// src/components/LoginForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../actions/actions';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registeredUsers = useSelector((state) => state.registeredUsers);
    const loggedInUser = useSelector((state) => state.loggedInUser);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = registeredUsers.find(
            (user) => user.email === formData.email && user.password === formData.password
        );
        if (user) {
            dispatch(loginUser(user));
            navigate('/'); // Redirect to home page
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className=" h-full flex justify-center items-center bg-gray-100">
            <div className='max-w-md mx-auto p-10 mb-52 bg-white rounded-md shadow-lg '>
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                {error && (
                    <div className="bg-red-500 text-white p-2 rounded-md mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500">Register here</Link>
                </p>
            </div>

        </div>
    );
};

export default LoginForm;
