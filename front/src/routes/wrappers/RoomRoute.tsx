import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createRoomService } from '../../services/room.service';

interface PublicRouteProps {
    children: JSX.Element;
}

export default function RoomRoute(props: PublicRouteProps) {
    const { id: roomId } = useParams();

    const roomService = createRoomService();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!auth.isLogged()) {
    //         auth.logout();
    //         navigate('/login');
    //     }
    // }, []);

    return props.children;
}
