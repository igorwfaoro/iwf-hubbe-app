import { useEffect, useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { createRoomService } from '../../services/room.service';
import { RoomDetail } from '../../models/api/room-detail';
import { useParams } from 'react-router-dom';
import { mapHttpError } from '../../core/http';
import { createSocket } from '../../core/socket';
import { useAuth } from '../../contexts/AuthContext';
import { SocketEvent } from '../../util/enums/socket-event';

interface RoomProps {}

export default function Room({}: RoomProps) {
    const { id: roomId } = useParams();

    const toast = useToast();
    const auth = useAuth();
    const roomService = createRoomService();

    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState<RoomDetail>();

    let socket;

    useEffect(() => {
        getRoom();

        const socket = connectSocket();

        return () => {
            socket.disconnect();
        };
    }, []);

    const getRoom = () => {
        setLoading(true);
        roomService
            .getById(String(roomId))
            .then((response) => {
                setRoom(response);
            })
            .catch((error) => toast.show(mapHttpError(error), 'error'))
            .finally(() => setLoading(false));
    };

    const connectSocket = () => {
        const socket = createSocket();
        socket.on(SocketEvent.CONNECT, () => {
            socket.emit(SocketEvent.ACCESS_ROOM, { roomId });
        });

        return socket;
    };

    const renderLoading = () => {
        return <div>Loading...</div>;
    };

    return (
        <div className="p-4 pt-20">
            {loading ? (
                renderLoading()
            ) : (
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">{room?.name}</h1>
                    <h2 className="text-xl">{room?.description}</h2>

                    <div dangerouslySetInnerHTML={{ __html: room?.content! }} />
                </div>
            )}
        </div>
    );
}
