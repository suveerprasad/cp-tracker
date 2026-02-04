import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Start from "./pages/Start";
import PrivateRoute from "./components/PrivateRoute";
import LeetcodePage from "./pages/LeetcodePage";
import CodechefPage from "./pages/CodechefPage";
import CodeforcesPage from "./pages/CodeforcesPage";
import Dashboard from "./pages/Dashboard";
import Contest from "./pages/Contest";
import ProfileForm from "./pages/ProfileForm";
import PP from "./pages/PP";
import AuthRoute from './components/AuthRoute'

export const router = createBrowserRouter([
    { path: "/", element: <Start /> },
    {
        path: "/signup",
        element: (
            <AuthRoute>
                <SignUp />
            </AuthRoute>
        )
    },
    {
        path: "/login",
        element: (
            <AuthRoute>
                <Login />
            </AuthRoute>
        )
    },
    { path: "/privacy", element: <PP /> },
    {
        path: "/profile",
        element: (
            <PrivateRoute>
                <Profile />
            </PrivateRoute>
        )
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        )

    },

    {
        path: "/contest",
        element: (
            <PrivateRoute>
                <Contest />
            </PrivateRoute>
        )
    },
    {
        path: "/leetcode",
        element: (
            <PrivateRoute>
                <LeetcodePage />
            </PrivateRoute>
        )
    },
    {
        path: "/codechef",
        element: (
            <PrivateRoute>
                <CodechefPage />
            </PrivateRoute>
        )
    },
    {
        path: "/codeforces",
        element: (
            <PrivateRoute>
                <CodeforcesPage />
            </PrivateRoute>
        )
    },
    {
        path: "/profileform",
        element: (
            <PrivateRoute>
                <ProfileForm />
            </PrivateRoute>
        )
    },
]);