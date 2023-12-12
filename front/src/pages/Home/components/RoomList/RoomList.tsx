import { useEffect, useState } from 'react';
import { ShieldAlert as IconShield } from 'lucide-react';
import { useLoader } from '../../../../contexts/LoaderContext';
import { useToast } from '../../../../contexts/ToastContext';
import { createRoomService } from '../../../../services/room/room.service';
import { Room } from '../../../../models/api/room';
import { mapHttpError } from '../../../../core/http';
import Card from '../../../../components/Card/Card';

interface RoomListProps {}

export default function RoomList({}: RoomListProps) {
    const loader = useLoader();
    const toast = useToast();
    const roomService = createRoomService();

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = () => {
        loader.show();
        roomService
            .getAll()
            .then((rooms) => setRooms(rooms))
            .catch((error) => toast.show(mapHttpError(error), 'error'))
            .finally(() => loader.hide());
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 space-x-4">
            {rooms.map((room, i) => (
                <a key={i} href={`/room/${room.id}`}>
                    <Card
                        className="relative p-4 h-36 flex flex-col items-start justify-end before:absolute before:rounded-2xl before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-t before:from-black before:to-60% hover:brightness-125"
                        bgImageUrl={room.image}
                    >
                        {room.isSecret && (
                            <IconShield className="absolute bottom-4 right-4 stroke-white" />
                        )}

                        <div className="z-10 text-white">
                            <h2 className="font-bold text-lg">{room.name}</h2>
                            <div className="text-sm">{room.description}</div>
                        </div>
                    </Card>
                </a>
            ))}
        </div>
    );
}
