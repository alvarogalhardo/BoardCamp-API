import { Router } from "express";
import { deleteRental, getRentals, postRental } from "../controllers/rentals.js";
import {
  checkExists,
  validateModel,
  createPostObject,
  checkRentals,
  checkQuery,
  checkId,
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
rentalRoutes.get("/rentals",checkQuery,getRentals);
rentalRoutes.delete("/rentals/:id",checkId,deleteRental)
export default rentalRoutes;
