import joi from 'joi';

export const customerSchema = joi.object({
        name: joi.string().required(),
        phone: joi.string().required(),
        cpf: joi.string().required(),
        birthday: joi.string().format('YYYY-MM-DD').raw().required()
})