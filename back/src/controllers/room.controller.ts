import { Router } from 'express';
import { validateInput } from '../middlewares/validate-input';
import { createRoomService } from '../services/room.service';
import { roomValidator } from '../validators/room.validator';
import { checkHttpToken } from '../middlewares/check-token';

const RoomController = Router();

const roomService = createRoomService();

RoomController.get('/', [checkHttpToken], async (req, res, next) => {
    try {
        const result = await roomService.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
});

RoomController.get(
    '/:id',
    [checkHttpToken, validateInput(roomValidator.getById)],
    async (req, res, next) => {
        try {
            const result = await roomService.getById(String(req.params.id));
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

RoomController.get(
    '/:id/isInUse',
    [checkHttpToken, validateInput(roomValidator.isInUse)],
    async (req, res, next) => {
        try {
            const result = await roomService.isInUse(String(req.params.id));
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

export { RoomController };
