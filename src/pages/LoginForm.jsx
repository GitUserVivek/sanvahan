import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../redux/actions/actions';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginEndpoint } from '../consts';
// import { decode as jwt_decode } from 'jwt-decode';  
import { jwtDecode as jwt_decode } from 'jwt-decode'


const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.loggedInUser);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if token exists in localStorage and if it's expired
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwt_decode(token);
                console.log({ decoded })
                const currentTime = Date.now() / 1000; // Get current time in seconds
                if (decoded.exp < currentTime) {
                    // Token is expired, log the user out
                    localStorage.removeItem('token');
                    dispatch(logoutUser());
                } else {
                    // Token is valid, set user in Redux state
                    dispatch(loginUser({ ...decoded, token }));
                }
            } catch (error) {
                console.log('Error decoding token:', error);
            }
        }
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(loginEndpoint, {
                email: formData.email,
                password: formData.password,
            });

            if (response.data.token) {
                // Store token and user data in localStorage
                localStorage.setItem('token', response.data.token);

                // Dispatch login action with the user data
                dispatch(loginUser(response.data.user));

                // Redirect to home page
                navigate('/');
            }
        } catch (err) {
            setError('Invalid email or password ' + err);
        }
    };

    if (loggedInUser) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="h-full flex justify-center items-center bg-gray-100">
            <div className="max-w-md mx-auto p-10 mb-52 bg-white rounded-md shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                {error && (
                    <div className="bg-red-500 text-white p-2 rounded-md mb-4 text-center">
                        {error}
                    </div>
                )}

                <form>
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
                        onClick={handleSubmit}
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
