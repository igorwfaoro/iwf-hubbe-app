import { ERROR_MESSAGES } from '../../../static/error-messages';
import { CustomException } from '../../exceptions/setup/custom.exception';
import { onError } from './on-error';

describe('onError', () => {
    it('should handle a CustomException and return the expected response', () => {
        const error = new CustomException(404, 'Custom error message');

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        onError(error, null, res, null);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 404,
            message: 'Custom error message',
            stack: error.stack
        });
    });

    it('should handle an unknown error and return the default response', () => {
        const error = new Error('Unknown error');

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        onError(error, null, res, null);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 400,
            message: ERROR_MESSAGES.UNKNOWN_ERROR,
            details: undefined,
            stack: error.stack
        });
    });
});
