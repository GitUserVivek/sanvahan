import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { registerEndpoint } from '../consts';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        organizationName: '',
        licensePlate: '',
        capacity: '',
        drivingLicenseNumber: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(registerEndpoint, formData);
            dispatch({ type: 'REGISTER_USER', payload: response.data }); // Example for redux

            setFormData({ name: '', email: '', password: '', role: '', organizationName: '', licensePlate: '', capacity: '', drivingLicenseNumber: '', phone: '' });
        } catch (error) {

            console.error('Registration error:', error);
        }
    };

    return (
        <div className="h-full flex justify-center items-center bg-gray-100 ">
            <div className=' mx-auto my-auto p-10 mb-52 bg-white w-1/4 rounded-md shadow-lg'>
                <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
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
                            required
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
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                            <option value="truckOwner">Truck Owner</option>
                            <option value="truckDriver">Truck Driver</option>
                        </select>
                    </div>
                    {formData.role === 'customer' && (
                        <>

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Organization Name</label>
                                <input
                                    type="text"
                                    name="organizationName"
                                    value={formData.organizationName}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </>
                    )}
                    {formData.role === 'truckDriver' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Driving License Number</label>
                            <input
                                type="text"
                                name="drivingLicenseNumber"
                                value={formData.drivingLicenseNumber}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    )}
                    {formData.role === 'truckOwner' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium">License Plate</label>
                            <input
                                type="text"
                                name="licensePlate"
                                value={formData.licensePlate}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <label className="block text-sm font-medium">Capacity</label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    )}
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
