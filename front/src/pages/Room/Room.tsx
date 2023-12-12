import { useEffect, useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { createRoomService } from '../../services/room/room.service';
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
    const roomService = createRoomService();

    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState<RoomDetail>();

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
            <>
                <Skeleton className="w-full h-64 rounded-t-2xl" />

                <div className="space-y-3 p-4">
                    <Skeleton className="h-7 w-[70%] md:w-[30%]" />
                    <Skeleton className="h-5 w-[50%] md:w-[20%]" />

                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="h-3"
                            style={{ width: `${30 + Math.random() * 30}%` }}
                        />
                    ))}
                </div>
            </>
        );
    };

    return (
        <Page>
            <Card className="w-full">
                {loading ? (
                    renderLoading()
                ) : (
                    <>
                        <div
                            style={{ backgroundImage: `url(${room?.image})` }}
                            className="w-full h-64 rounded-t-2xl bg-center bg-cover"
                        />
                        <div className="space-y-5 p-4">
                            <div className="space-y-2">
                                <Page.Title>{room?.name}</Page.Title>
                                <Page.Subtitle>{room?.description}</Page.Subtitle>
                            </div>

                            <div className='w-full border-b border-gray-300' />

                            <div
                                className="prose"
                                dangerouslySetInnerHTML={{ __html: room?.content! }}
                            />
                        </div>
                    </>
                )}
            </Card>
        </Page>
    );
}
