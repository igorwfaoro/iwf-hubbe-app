import { BrowserRouter, Navigate, Route, Routes as BrowserRoutes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import PrivateRoute from './wrappers/PrivateRoute';
import PublicRoute from './wrappers/PublicRoute';
import Navbar from '../components/Navbar/Navbar';
import Home from '../pages/Home/Home';
import RoomRoute from './wrappers/RoomRoute';
import Room from '../pages/Room/Room';
import About from '../pages/About/About';
import { ReactNode } from 'react';

const routes: { path: string; type: 'private' | 'public'; element: ReactNode }[] = [
    {
        path: '/login',
        type: 'public',
        element: <Login />
    },
    {
        path: '/home',
        type: 'private',
        element: <Home />
    },
    {
        path: '/room/:id',
        type: 'private',
        element: (
            <RoomRoute>
                <Room />
            </RoomRoute>
        )
    },
    {
        path: '/about',
        type: 'private',
        element: <About />
    }
];

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <BrowserRoutes>
                <Route element={<PrivateRoute />}>
                    {routes
                        .filter((route) => route.type === 'private')
                        .map((route, i) => (
                            <Route key={i} path={route.path} element={route.element} />
                        ))}
                </Route>

                <Route element={<PublicRoute />}>
                    {routes
                        .filter((route) => route.type === 'public')
                        .map((route, i) => (
                            <Route key={i} path={route.path} element={route.element} />
                        ))}
                </Route>

                <Route path="/" element={<Navigate to="/home" replace />} />
            </BrowserRoutes>
        </BrowserRouter>
    );
};

export default Routes;
