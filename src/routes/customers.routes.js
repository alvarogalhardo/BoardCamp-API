import { Router } from "express";
import {
  getCusotmerById,
  getCustomers,
  postCustomer,
  updateCustomer,
} from "../controllers/customers.js";
import {
  checkExists,
  checkQuery,
  validateModel,
} from "../middlewares/customers.js";

const customerRoutes = Router();

customerRoutes.get("/customers", checkQuery, getCustomers);
customerRoutes.get("/customers/:id", getCusotmerById);
customerRoutes.post("/customers", validateModel, checkExists, postCustomer);
customerRoutes.put(
  "/customers/:id",
  validateModel,
  checkExists,
  updateCustomer
);

export default customerRoutes;
