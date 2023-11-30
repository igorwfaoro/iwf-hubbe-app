import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class NotFoundException extends CustomException {
    constructor(message = ERROR_MESSAGES.NOT_FOUND, statusCode = 404) {
        super(statusCode, message);
    }
}
