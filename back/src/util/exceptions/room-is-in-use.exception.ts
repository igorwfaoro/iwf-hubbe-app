import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class RoomIsInUseException extends CustomException {
    constructor(message = ERROR_MESSAGES.ROOM_IS_IN_USE, statusCode = 400) {
        super(statusCode, message);
    }
}
