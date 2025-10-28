import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useAuth();

    if (loading) {
        return <span className="loading loading-infinity loading-xl"></span>
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/login">Login</Navigate>;
    }
    return children;
}

export default PrivateRoute;