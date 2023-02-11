import joi from 'joi';

export const customerSchema = joi.object({
        name: joi.string().not('').required(),
        phone: joi.string().length(10,11).required(),
        cpf: joi.string().length(11).numeric().required(),
        birthday: joi.date().iso("YYYY-MM-DD").required()
})