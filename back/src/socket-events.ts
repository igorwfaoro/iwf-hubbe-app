import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { checkSocketToken } from './middlewares/check-token/check-token';
import { SocketEvent } from './util/enums/socket-event';
import { createRoomService } from './services/room/room.service';
import { AccessRoomInputModel } from './models/input-models/access-room.input-model';

export const createSocketEvents = (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    const roomService = createRoomService();

    io.on(SocketEvent.CONNECTION, (socket) => {
        const { user } = checkSocketToken(socket);

        console.log(SocketEvent.CONNECTION, {
            id: socket.id,
            user: user.username
        });

        socket.on(SocketEvent.DISCONNECT, () => {
            console.log(SocketEvent.DISCONNECT, {
                id: socket.id,
                user: user.username
            });

            roomService.removeUserFromRooms(user.id);
        });

        socket.on(SocketEvent.ACCESS_ROOM, (data: AccessRoomInputModel) => {
            console.log(SocketEvent.ACCESS_ROOM, {
                id: socket.id,
                user: user.username,
                data
            });

            roomService.setCurrentUser(data.roomId, user.id);
        });
    });
};
