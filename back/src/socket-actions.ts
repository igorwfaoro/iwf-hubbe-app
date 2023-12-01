import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const createSocketActions = (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    io.on('connection', (socket) => {
        console.log('a user connected', socket.data);
    });
};
