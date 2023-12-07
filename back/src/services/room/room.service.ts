import { prisma } from '../../database/db';
import { NotFoundException } from '../../util/exceptions/not-found.exception';
import { RoomIsBlockedViewModel } from '../../models/view-models/room-is-blocked.view-model';
import { RoomViewModel } from '../../models/view-models/room.view-model';
import { RoomDetailViewModel } from '../../models/view-models/room-detail.view-model';
import { RoomIsBlockedException } from '../../util/exceptions/room-is-blocked.exception';

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

    const isBlocked = async (
        id: string,
        userId: string
    ): Promise<RoomIsBlockedViewModel> => {
        const room = await prisma.room.findUnique({
            where: { id }
        });

        if (!room) throw new NotFoundException();

        const isBlocked = !!room.currentUserId && room.currentUserId !== userId;

        return RoomIsBlockedViewModel.create(room, isBlocked);
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
            // if room.currentUserId is defined and is not equal userId then room is blocked
            if (!!room.currentUserId && room.currentUserId !== userId)
                throw new RoomIsBlockedException();

            // if room.currentUserId is not equal userId then define it
            if (room.currentUserId !== userId) {
                await prisma.room.update({
                    where: { id },
                    data: {
                        currentUserId: userId
                    }
                });
            }
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
        isBlocked,
        setCurrentUser,
        removeUserFromRooms
    };
};
