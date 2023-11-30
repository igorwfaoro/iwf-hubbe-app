import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from './setup/custom.exception';

export class StrategyException extends CustomException {
    constructor(message = ERROR_MESSAGES.STRATEGY_ERROR, statusCode = 400) {
        super(statusCode, message);
    }
}
