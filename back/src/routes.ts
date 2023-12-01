import { Router } from 'express';
import { AuthController } from './controllers/auth.controller';
import { API_NAME, API_V1 } from './static/constants';
import { RoomController } from './controllers/room.controller';

const routes = Router();

routes.get(`/healthcheck`, (req, res) =>
    res.json({
        name: API_NAME,
        version: process.env.npm_config_init_version
    })
);

routes.use(`/${API_V1}/auth`, AuthController);
routes.use(`/${API_V1}/rooms`, RoomController);

export { routes };
