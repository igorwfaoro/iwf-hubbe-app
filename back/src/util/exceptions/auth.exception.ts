import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class AuthException extends CustomException {
    constructor(message = ERROR_MESSAGES.AUTHENTICATION_ERROR, statusCode = 401) {
        super(statusCode, message);
    }
}
