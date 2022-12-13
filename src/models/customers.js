import Joi from "joi";

const customerModel = Joi.object({
  name: Joi.string().required().min(3),
  phone: Joi.string()
    .pattern(/(^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$)/)
    .alphanum()
    .length(11),
  cpf: Joi.string()
    .pattern(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/)
    .min(10)
    .max(11),
  birthday: Joi.date(),
});

export default customerModel;
