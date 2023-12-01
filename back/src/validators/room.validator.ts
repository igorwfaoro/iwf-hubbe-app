import Joi from 'joi';

export const roomValidator = {
    getById: Joi.object({
        params: Joi.object({
            id: Joi.string().required()
        }).required()
    }),
    isInUse: Joi.object({
        params: Joi.object({
            id: Joi.string().required()
        }).required()
    }),
};
