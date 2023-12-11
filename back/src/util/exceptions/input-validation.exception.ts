import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class InputValidationException extends CustomException {
    constructor(message = ERROR_MESSAGES.INVALID_INPUT, statusCode = 422) {
        super(statusCode, message, null);
    }
}
