require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { routes } from './src/routes';
import { onError } from './src/util/functions/on-error';
import { ENV } from './src/env';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { createSocketEvents } from './src/socket-events';

console.log('Initializing...');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    },
    // pingInterval: 10000,
    // pingTimeout: 5000
});

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(onError);

createSocketEvents(io);

const HOST = ENV.HOST || 'localhost';
const PORT = ENV.PORT || 3333;

const listener = server.listen(PORT, HOST, () => {
    const { address, port } = listener.address() as any;
    console.log(`Running on http://${address}:${port}`);
});
