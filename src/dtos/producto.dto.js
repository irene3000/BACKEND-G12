import Joi from "joi"

export const productoDto = Joi.object({
    nombre :Joi.string().required(),
    precio :Joi.number().required(),
    disponible : Joi.boolean()

})