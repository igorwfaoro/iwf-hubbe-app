import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PublicRouteProps {
    children: JSX.Element;
}

const PrivateRoute = (props: PublicRouteProps) => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isLogged()) {
            auth.logout();
            navigate('/login');
        }
    }, []);

    return props.children;
};

export default PrivateRoute;
