import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class RoomIsBlockedException extends CustomException {
    constructor(message = ERROR_MESSAGES.ROOM_IS_BLOCKED, statusCode = 400) {
        super(statusCode, message);
    }
}
