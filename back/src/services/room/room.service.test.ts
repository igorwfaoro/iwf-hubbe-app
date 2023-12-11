import { Room } from '@prisma/client';
import { prisma } from '../../database/db';
import { createRoomService } from './room.service';
import { RoomDetailViewModel } from '../../models/view-models/room-detail.view-model';
import { NotFoundException } from '../../util/exceptions/not-found.exception';
import { RoomViewModel } from '../../models/view-models/room.view-model';
import { RoomIsBlockedException } from '../../util/exceptions/room-is-blocked.exception';

const getMockRooms = (): Room[] => [
    {
        id: '656a316b153afab71902bf8d',
        name: 'Free Room',
        description: 'This is a free room',
        content:
            '<h1>This is a free room</h1><p>Mollit cillum sint duis Lorem consectetur officia sit esse irure eu deserunt laboris. Culpa nulla velit pariatur ex pariatur duis excepteur pariatur officia ad. Incididunt minim velit ut qui excepteur consequat reprehenderit pariatur incididunt sit nostrud adipisicing sunt quis.</p>',
        isSecret: false,
        image: 'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        currentUserId: null
    },
    {
        id: '656a316b153afab71902bf8e',
        name: 'Secret Room',
        description: 'This is a secret room',
        content:
            '<h1>This is a secret room</h1><p>Magna excepteur Lorem eu Lorem quis excepteur eu. Ex consequat enim esse do pariatur reprehenderit deserunt officia veniam. Anim et exercitation nostrud reprehenderit pariatur enim pariatur aliqua. Deserunt magna nulla proident sunt cillum ex eiusmod esse. Ullamco cupidatat excepteur dolore id cillum nostrud aute.</p>',
        isSecret: true,
        image: 'https://images.pexels.com/photos/1726310/pexels-photo-1726310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        currentUserId: null
    }
];

const userId = '656f529782e8ecf31ba818b9';
const anotherUserId = '656f529782e8ecf31ba818ba';

const invalidId = '000000000';

describe('createRoomService', () => {
    const roomService = createRoomService();

    let mockRooms: Room[] = getMockRooms();
    let mockRoom: Room = getMockRooms()[0];

    beforeEach(() => {
        jest.clearAllMocks();
        mockRooms = getMockRooms();
        mockRoom = getMockRooms()[0];
    });

    it('getAll should return an array of RoomViewModel', async () => {
        jest.spyOn(prisma.room, 'findMany').mockResolvedValue(mockRooms);

        const result = await roomService.getAll();

        expect(result).toEqual(mockRooms.map(RoomViewModel.fromModel));
    });

    it('getById should return a RoomDetailViewModel for a valid id', async () => {
        jest.spyOn(prisma.room, 'findUnique').mockResolvedValue(mockRoom);

        const result = await roomService.getById(mockRoom.id);

        expect(result).toEqual(RoomDetailViewModel.fromModel(mockRoom));
    });

    it('getById should throw NotFoundException for an invalid id', async () => {
        jest.spyOn(prisma.room, 'findUnique').mockResolvedValue(null);

        await expect(async () => {
            await roomService.getById(invalidId);
        }).rejects.toThrowError(NotFoundException);
    });

    it('isBlocked should return RoomIsBlockedViewModel with true if room is blocked', async () => {
        mockRoom.currentUserId = anotherUserId;

        jest.spyOn(prisma.room, 'findUnique').mockResolvedValue(mockRoom);

        const result = await roomService.isBlocked(mockRoom.id, userId);

        expect(result.isBlocked).toEqual(true);
    });

    it('isBlocked should return RoomIsBlockedViewModel with false if room is not blocked (currentUserId: null)', async () => {
        jest.spyOn(prisma.room, 'findUnique').mockResolvedValue(mockRoom);

        const result = await roomService.isBlocked(mockRoom.id, userId);

        expect(result.isBlocked).toEqual(false);
    });

    it('isBlocked should return RoomIsBlockedViewModel with false if room is not blocked (currentUserId: same user)', async () => {
        mockRoom.currentUserId = userId;

        jest.spyOn(prisma.room, 'findUnique').mockResolvedValue(mockRoom);

        const result = await roomService.isBlocked(mockRoom.id, userId);

        expect(result.isBlocked).toEqual(false);
    });

    it('isBlocked should throw NotFoundException for an invalid room id', async () => {
        jest.spyOn(prisma.room, 'findUnique').mockResolvedValue(null);

        await expect(async () => {
            await roomService.isBlocked(invalidId, userId);
        }).rejects.toThrowError(NotFoundException);
    });

    it('setCurrentUser should update currentUserId if the room is secret and not blocked', async () => {
        mockRoom = { ...mockRoom, isSecret: true, currentUserId: null };

        jest.spyOn(prisma.room, 'findUnique').mockResolvedValue(mockRoom);
        const updateSpy = jest.spyOn(prisma.room, 'update').mockResolvedValue(mockRoom);

        await roomService.setCurrentUser(mockRoom.id, userId);

        expect(updateSpy).toHaveBeenCalledWith({
            where: { id: mockRoom.id },
            data: {
                currentUserId: userId
            }
        });
    });

    it('setCurrentUser should throw RoomIsBlockedException if the room is secret and already blocked', async () => {
        mockRoom = {
            ...mockRoom,
            isSecret: true,
            currentUserId: anotherUserId
        };

        jest.spyOn(prisma.room, 'findUnique').mockResolvedValue(mockRoom);

        await expect(async () => {
            await roomService.setCurrentUser(mockRoom.id, userId);
        }).rejects.toThrowError(RoomIsBlockedException);
    });

    it('removeUserFromRooms should update currentUserId to null for multiple rooms', async () => {
        mockRooms[0].currentUserId = userId;
        mockRooms[1].currentUserId = userId;

        jest.spyOn(prisma.room, 'updateMany').mockResolvedValue({ count: 2 });

        await roomService.removeUserFromRooms(userId);

        expect(prisma.room.updateMany).toHaveBeenCalledWith({
            where: { currentUserId: userId },
            data: { currentUserId: null }
        });
    });

    it('removeUserFromRooms should not throw an error when no rooms found', async () => {
        jest.spyOn(prisma.room, 'updateMany').mockResolvedValue({ count: 0 });

        await expect(async () => {
            await roomService.removeUserFromRooms(userId);
        }).not.toThrow();
    });
});
