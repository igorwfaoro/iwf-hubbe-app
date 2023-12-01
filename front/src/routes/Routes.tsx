import { BrowserRouter, Navigate, Route, Routes as BrowserRoutes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import PrivateRoute from './wrappers/PrivateRoute';
import PublicRoute from './wrappers/PublicRoute';
import Navbar from '../components/Navbar/Navbar';
import Home from '../pages/Home/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <BrowserRoutes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />

                <Route path="/" element={<Navigate to="/home" replace />} />
            </BrowserRoutes>
        </BrowserRouter>
    );
};

export default Routes;
