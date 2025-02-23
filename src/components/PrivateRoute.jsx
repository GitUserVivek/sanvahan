// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const loggedInUser = useSelector((state) => state.loggedInUser);
    // If user is not logged in, redirect to login page
    if (!loggedInUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
