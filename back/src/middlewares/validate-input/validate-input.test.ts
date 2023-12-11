import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { InputValidationException } from '../../util/exceptions/input-validation.exception';
import { validateInput } from './validate-input';

const schema = Joi.object({
    body: Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required()
    })
});

describe('validateInput Middleware', () => {
    it('should call next function with InputValidationException for invalid input', () => {
        const mockNext = jest.fn();

        const invalidData = { username: 'a', email: 'invalid-email' };

        const mockRequest = { body: invalidData } as Request;
        const mockResponse = {} as Response;

        validateInput(schema)(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(expect.any(InputValidationException));
    });

    it('should call next function without error for valid input', () => {
        const mockNext = jest.fn();

        const validData = { username: 'user', email: 'user@user.com' };

        const mockRequest = { body: validData } as Request;
        const mockResponse = {} as Response;

        validateInput(schema)(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith();
    });
});
