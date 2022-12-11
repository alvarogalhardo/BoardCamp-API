import joi from "joi";

const rentalModel = joi.object({
  customerId: joi.number().required().min(1),
  gameId: joi.number().required().min(1),
  daysRented: joi.number().required().min(1),
});

export default rentalModel;
