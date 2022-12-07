import joi from 'joi';

const categorieModel = joi.object({
    name: joi.string().required()
})