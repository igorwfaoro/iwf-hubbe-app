import { useEffect, useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { createRoomService } from '../../services/room.service';
import { RoomDetail } from '../../models/api/room-detail';
import { useParams } from 'react-router-dom';
import { mapHttpError } from '../../core/http';
import { createSocket } from '../../core/socket';
import { useAuth } from '../../contexts/AuthContext';
import { SocketEvent } from '../../util/enums/socket-event';
import Skeleton from '../../components/Skeleton/Skeleton';
import Page from '../../components/Page/Page';
import Card from '../../components/Card/Card';

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
        return (
            <div className="space-y-2">
                <Skeleton className="h-7 w-[70%] md:w-[30%]" />
                <Skeleton className="h-5 w-[50%] md:w-[20%]" />

                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="h-4"
                        style={{ width: `${30 + Math.random() * 30}%` }}
                    />
                ))}
            </div>
        );
    };

    return (
        <Page className="flex flex-col items-center">
            <Card className="w-[95%] md:w-[85%] lg:w-[70%]">
                {loading ? (
                    renderLoading()
                ) : (
                    <>
                        <div
                            style={{ backgroundImage: `url(${room?.image})` }}
                            className="w-full h-64 rounded-t-2xl bg-center bg-cover"
                        />
                        <div className="space-y-2 p-4">
                            <h1 className="text-3xl font-bold">{room?.name}</h1>
                            <h2 className="text-xl">{room?.description}</h2>

                            <div dangerouslySetInnerHTML={{ __html: room?.content! }} />
                        </div>
                    </>
                )}
            </Card>
        </Page>
    );
}
