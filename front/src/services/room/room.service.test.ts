import { API_URLS } from '../../constants/api-urls';
import { createRoomService } from './room.service';
import { http } from '../../core/http';
import { Room } from '../../models/api/room';
import { RoomDetail } from '../../models/api/room-detail';
import { RoomIsBlocked } from '../../models/api/room-is-blocked';

jest.mock('../../constants/api-base-url', () => ({
    getApiBaseUrl: jest.fn().mockReturnValue('http://baseurl.com')
}));

jest.mock('../../core/http');

describe('RoomService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call getAll API with the correct URL', async () => {
        const roomService = createRoomService();

        const roomsData: Room[] = [
            {
                id: 'room1',
                name: 'Room 1',
                description: 'Description 1',
                image: 'image1.jpg',
                isSecret: false
            },
            {
                id: 'room2',
                name: 'Room 2',
                description: 'Description 2',
                image: 'image2.jpg',
                isSecret: true
            }
        ];

        const mockGet = jest.fn().mockResolvedValueOnce({
            data: roomsData
        });

        (http as any).mockReturnValueOnce({
            get: mockGet
        });

        const response = await roomService.getAll();

        expect(mockGet).toHaveBeenCalledWith(API_URLS.rooms.getAll());
        expect(response).toEqual(roomsData);
    });

    it('should call getById API with the correct URL', async () => {
        const roomService = createRoomService();

        const roomData: RoomDetail = {
            id: 'room1',
            name: 'Room 1',
            description: 'Description 1',
            image: 'image1.jpg',
            isSecret: false,
            content: 'content content content'
        };

        const mockGet = jest.fn().mockResolvedValueOnce({
            data: roomData
        });

        (http as any).mockReturnValueOnce({
            get: mockGet
        });

        const response = await roomService.getById(roomData.id);

        expect(mockGet).toHaveBeenCalledWith(API_URLS.rooms.getById(roomData.id));
        expect(response).toEqual(roomData);
    });

    it('should call isBlocked API with the correct URL', async () => {
        const roomService = createRoomService();

        const roomData: RoomIsBlocked = {
            id: 'roomId1',
            isSecret: true,
            isBlocked: false
        };

        const mockGet = jest.fn().mockResolvedValueOnce({
            data: roomData
        });

        (http as any).mockReturnValueOnce({
            get: mockGet
        });

        const response = await roomService.isBlocked(roomData.id);

        expect(mockGet).toHaveBeenCalledWith(API_URLS.rooms.isBlocked(roomData.id));
        expect(response).toEqual(roomData);
    });
});
