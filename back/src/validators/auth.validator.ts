import Joi from 'joi';

export const authValidator = {
    login: Joi.object({
        body: Joi.object({
            username: Joi.string().required()
        }).required()
    })
};
