import { Router } from "express";
import {
  deleteRental,
  getRentals,
  postRental,
} from "../controllers/rentals.js";
import {
  checkExists,
  validateModel,
  createPostObject,
  checkRentals,
  checkQuery,
  checkId,
  createReturnObject,
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
rentalRoutes.get("/rentals", checkQuery, getRentals);
rentalRoutes.post(
  "/rentals/:id/return",
  checkId,
  createReturnObject,
  postRental
);
rentalRoutes.delete("/rentals/:id", checkId, deleteRental);

export default rentalRoutes;
