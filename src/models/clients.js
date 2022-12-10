import joi from "joi";

const clientModel = joi.object({
  name: joi.string().min(3).required(),
  phone: joi.string().pattern(/^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$/),
  cpf: joi.string().pattern(/(\d{3})(\d{3})(\d{3})(\d{2})/),
  birthday: joi.date(),
});

export default clientModel;
