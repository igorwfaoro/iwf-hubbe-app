import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import { useAuth } from '../../contexts/AuthContext';
import { createRoomService } from '../../services/room.service';
import { Room } from '../../models/api/room';
import { useLoader } from '../../contexts/LoaderContext';
import { useToast } from '../../contexts/ToastContext';
import { mapHttpError } from '../../core/http';
import { ShieldAlert as IconShield } from 'lucide-react';

interface HomeProps {}

export default function Home({}: HomeProps) {
    const auth = useAuth();
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

    const title = `Welcome ${auth.getLoggedUser()?.fullName}`;

    return (
        <div className="p-4 pt-20">
            <h1 className="text-4xl font-bold">{title}</h1>

            <div className="grid grid-cols-6 mt-4 space-x-4">
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
        </div>
    );
}
