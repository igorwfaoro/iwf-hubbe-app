import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class DatabaseException extends CustomException {
    constructor(error: any, message = ERROR_MESSAGES.DATABASE_ERROR, statusCode = 500) {
        super(statusCode, message, error);
    }
}
