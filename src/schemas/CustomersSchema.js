import joi from 'joi';

export const customerSchema = joi.object({
        name: joi.string().not('').required(),
        phone: joi.string().min(10).max(11).required(),
        cpf: joi.string().length(11).alphanum().required(),
        birthday: joi.date().iso("YYYY-MM-DD").required()
})