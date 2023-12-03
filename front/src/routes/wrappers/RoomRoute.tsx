import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRoomService } from '../../services/room.service';
import { useToast } from '../../contexts/ToastContext';
import { useLoader } from '../../contexts/LoaderContext';
import { RoomIsInUse } from '../../models/api/room-is-in-use';

interface RoomRouteProps {
    children: React.ReactNode;
}

export default function RoomRoute({ children }: RoomRouteProps) {
    const { id: roomId } = useParams();

    const roomService = createRoomService();
    const navigate = useNavigate();
    const loader = useLoader();
    const toast = useToast();

    const [room, setRoom] = useState<RoomIsInUse>();

    useEffect(() => {
        loader.show();
        roomService
            .isInUse(String(roomId))
            .then((response) => {
                setRoom(response);

                if (response.isSecret && response.isInUse) {
                    toast.show('Room is in use', 'info');
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

    if (room.isSecret && !room.isInUse) return children;
}
