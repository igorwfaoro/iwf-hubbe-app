import { prisma } from '../database/db';
import { NotFoundException } from '../util/exceptions/not-found.exception';
import { RoomIsInUseViewModel } from '../models/view-models/room-is-in-use.view-model';
import { RoomViewModel } from '../models/view-models/room.view-model';
import { RoomDetailViewModel } from '../models/view-models/room-detail.view-model';

export const createRoomService = () => {
    const getAll = async (): Promise<RoomViewModel[]> => {
        const rooms = await prisma.room.findMany();
        return rooms.map(RoomViewModel.fromModel);
    };

    const getById = async (id: string): Promise<RoomDetailViewModel> => {
        const room = await prisma.room.findUnique({
            where: { id }
        });

        if (!room) throw new NotFoundException();

        return RoomDetailViewModel.fromModel(room);
    };

    const isInUse = async (id: string): Promise<RoomIsInUseViewModel> => {
        const room = await prisma.room.findUnique({
            where: { id }
        });

        if (!room) throw new NotFoundException();

        return RoomIsInUseViewModel.fromModel(room);
    };

    return {
        getAll,
        getById,
        isInUse
    };
};
