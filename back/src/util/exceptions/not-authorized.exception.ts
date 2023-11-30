import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class NotAuthorizedException extends CustomException {
    constructor(message = ERROR_MESSAGES.NOT_AUTHORIZED, statusCode = 401) {
        super(statusCode, message);
    }
}
