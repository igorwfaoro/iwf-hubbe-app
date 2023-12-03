import { API_URLS } from '../constants/api-urls';
import { http } from '../core/http';
import { Room } from '../models/api/room';
import { RoomDetail } from '../models/api/room-detail';
import { RoomIsInUse } from '../models/api/room-is-in-use';

export const createRoomService = () => {
    const getAll = (): Promise<Room[]> =>
        http()
            .get<Room[]>(API_URLS.rooms.getAll())
            .then((response) => response.data);

    const getById = (id: string): Promise<RoomDetail> =>
        http()
            .get<RoomDetail>(API_URLS.rooms.getById(id))
            .then((response) => response.data);

    const isInUse = (id: string): Promise<RoomIsInUse> =>
        http()
            .get<RoomIsInUse>(API_URLS.rooms.isInUse(id))
            .then((response) => response.data);

    return {
        getAll,
        getById,
        isInUse
    };
};
