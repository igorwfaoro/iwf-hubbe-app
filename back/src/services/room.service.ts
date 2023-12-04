import { prisma } from '../database/db';
import { NotFoundException } from '../util/exceptions/not-found.exception';
import { RoomIsInUseViewModel } from '../models/view-models/room-is-in-use.view-model';
import { RoomViewModel } from '../models/view-models/room.view-model';
import { RoomDetailViewModel } from '../models/view-models/room-detail.view-model';
import { RoomIsInUseException } from '../util/exceptions/room-is-in-use.exception';

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

    const setCurrentUser = async (
        id: string,
        userId: string | null
    ): Promise<RoomDetailViewModel> => {
        const room = await prisma.room.findUnique({
            where: { id }
        });

        if (!room) throw new NotFoundException();

        if (room.isSecret) {
            if (!!room.currentUserId) throw new RoomIsInUseException();

            await prisma.room.update({
                where: { id },
                data: {
                    currentUserId: userId
                }
            });
        }

        return RoomDetailViewModel.fromModel(room);
    };

    const removeUserFromRooms = async (userId: string) => {
        await prisma.room.updateMany({
            where: { currentUserId: userId },
            data: { currentUserId: null }
        });
    };

    return {
        getAll,
        getById,
        isInUse,
        setCurrentUser,
        removeUserFromRooms
    };
};
