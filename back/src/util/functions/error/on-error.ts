import { ERROR_MESSAGES } from '../../../static/error-messages';
import { CustomException } from '../../exceptions/setup/custom.exception';

export function onError(error, req, res, next) {
    let message: string;
    let statusCode: number;

    if (error instanceof CustomException) {
        message = error.message;
        statusCode = error.statusCode;
    } else {
        message = ERROR_MESSAGES.UNKNOWN_ERROR;
        statusCode = 400;
    }

    res.status(statusCode).json({
        statusCode,
        message,
        stack: error.stack
    });
}
