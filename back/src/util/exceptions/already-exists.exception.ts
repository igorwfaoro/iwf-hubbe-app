import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class AlreadyExistsException extends CustomException {
    constructor(message: string = ERROR_MESSAGES.ALREADY_EXISTS, statusCode = 401) {
        super(statusCode, message);
    }
}
