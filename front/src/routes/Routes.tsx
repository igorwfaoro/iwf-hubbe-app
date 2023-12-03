import { BrowserRouter, Navigate, Route, Routes as BrowserRoutes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import PrivateRoute from './wrappers/PrivateRoute';
import PublicRoute from './wrappers/PublicRoute';
import Navbar from '../components/Navbar/Navbar';
import Home from '../pages/Home/Home';
import RoomRoute from './wrappers/RoomRoute';
import Room from '../pages/Room/Room';

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <BrowserRoutes>
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />

                    <Route
                        path="/room/:id"
                        element={
                            <RoomRoute>
                                <Room />
                            </RoomRoute>
                        }
                    />
                </Route>

                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route path="/" element={<Navigate to="/home" replace />} />
            </BrowserRoutes>
        </BrowserRouter>
    );
};

export default Routes;
