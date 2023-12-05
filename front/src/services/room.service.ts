import { API_URLS } from '../constants/api-urls';
import { http } from '../core/http';
import { Room } from '../models/api/room';
import { RoomDetail } from '../models/api/room-detail';
import { RoomIsBlocked } from '../models/api/room-is-blocked';

export const createRoomService = () => {
    const getAll = (): Promise<Room[]> =>
        http()
            .get<Room[]>(API_URLS.rooms.getAll())
            .then((response) => response.data);

    const getById = (id: string): Promise<RoomDetail> =>
        http()
            .get<RoomDetail>(API_URLS.rooms.getById(id))
            .then((response) => response.data);

    const isBlocked = (id: string): Promise<RoomIsBlocked> =>
        http()
            .get<RoomIsBlocked>(API_URLS.rooms.isBlocked(id))
            .then((response) => response.data);

    return {
        getAll,
        getById,
        isBlocked
    };
};
