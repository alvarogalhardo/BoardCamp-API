import { Router } from "express";
import { postRental } from "../controllers/rentals.js";
import {
  checkExists,
  validateModel,
  createPostObject,
  checkRentals,
} from "../middlewares/rentals.js";

const rentalRoutes = Router();

rentalRoutes.post(
  "/rentals",
  validateModel,
  checkExists,
  checkRentals,
  createPostObject,
  postRental
);

export default rentalRoutes;
