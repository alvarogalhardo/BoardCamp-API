import joi from 'joi';

const gameModel = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().min(1),
    pricePerDay: joi.number().min(1),
    categoryId: joi.number()
})

export default gameModel;