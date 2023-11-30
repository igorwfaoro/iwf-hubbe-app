import { ERROR_MESSAGES } from '../../static/error-messages';
import { CustomException } from '../exceptions/setup/custom.exception';

export function onError(error, req, res, next) {
    console.error(error);

    let message: string;
    let statusCode: number;
    let details: string | undefined;

    if (error instanceof CustomException) {
        message = error.message;
        statusCode = error.statusCode;
        details = error.details;
    } else {
        message = ERROR_MESSAGES.UNKNOWN_ERROR;
        statusCode = 400;
    }

    res.status(statusCode).json({
        statusCode,
        message,
        details,
        stack: error.stack
    });
}
