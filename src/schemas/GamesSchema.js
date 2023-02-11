import joi from "joi";

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().positive().not(0).required(),
    pricePerDay: joi.number().positive().not(0).required()
})