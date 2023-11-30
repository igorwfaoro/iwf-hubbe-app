import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class OperationNotPermittedException extends CustomException {
    constructor(message = ERROR_MESSAGES.OPERATION_NOT_PERMITTED, statusCode = 400) {
        super(statusCode, message);
    }
}
