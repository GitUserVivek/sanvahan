import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/actions';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
        setFormData({ username: '', email: '', password: '' });
        alert('Registered successfully!');
    };

    return (
        <div className=" h-full flex justify-center items-center bg-gray-100">
            <div className='max-w-md mx-auto p-10 mb-52 bg-white rounded-md shadow-lg '>
                <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
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
                        Register
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
