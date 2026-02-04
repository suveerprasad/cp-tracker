import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const AuthRoute = ({ children }) => {
    const { session, loading } = UserAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>;
    }

    if (session) {
        // User is authenticated, redirect to profile
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default AuthRoute;