import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isLoading] = useAdmin(user.email);
    const location = useLocation();

    if (loading || isLoading) {
        return <div className='min-h-screen relative bg-yellow-400'>
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
            </div>
        </div>
    }

    if (!user?.uid || !isAdmin) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    return children;
};

export default AdminRoute;