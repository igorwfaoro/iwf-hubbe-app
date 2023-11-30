import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class UserWithoutAccessException extends CustomException {
    constructor(message = ERROR_MESSAGES.USER_WITHOUT_ACCESS, statusCode = 401) {
        super(statusCode, message);
    }
}
