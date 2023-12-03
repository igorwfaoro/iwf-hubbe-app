import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = () => {
    const auth = useAuth();

    const isLogged = auth.isLogged();

    if (!isLogged) auth.logout();

    return auth.isLogged() ? <Outlet /> : <Navigate to="/login" replace />;

    // const auth = useAuth();
    // const navigate = useNavigate();

    // const [isLogged, setIsAllowed] = useState<boolean>();

    // useEffect(() => {
    //     setIsAllowed(auth.isLogged());
    // }, []);

    // useEffect(() => {
    //     if (isLogged === false) {
    //         auth.logout();
    //         navigate('/login');
    //     }
    // }, [isLogged]);

    // return isLogged ? props.children : <></>;
};

export default PrivateRoute;
