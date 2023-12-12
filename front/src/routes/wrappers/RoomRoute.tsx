import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRoomService } from '../../services/room/room.service';
import { useToast } from '../../contexts/ToastContext';
import { useLoader } from '../../contexts/LoaderContext';
import { RoomIsBlocked } from '../../models/api/room-is-blocked';

interface RoomRouteProps {
    children: React.ReactNode;
}

export default function RoomRoute({ children }: RoomRouteProps) {
    const { id: roomId } = useParams();

    const roomService = createRoomService();
    const navigate = useNavigate();
    const loader = useLoader();
    const toast = useToast();

    const [room, setRoom] = useState<RoomIsBlocked>();

    useEffect(() => {
        loader.show();
        roomService
            .isBlocked(String(roomId))
            .then((response) => {
                setRoom(response);

                if (response.isSecret && response.isBlocked) {
                    toast.show('Room is blocked', 'info');
                    navigate('/');
                }
            })
            .catch(() => {
                toast.show('Error accessing room', 'error');
                navigate('/');
            })
            .finally(() => loader.hide());
    }, [roomId]);

    if (!room) return <>Loading...</>;

    if (room.isSecret && !room.isBlocked) return children;
}
