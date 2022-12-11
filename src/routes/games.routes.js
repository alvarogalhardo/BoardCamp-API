import { Router } from "express";
import {
  checkExistence,
  checkQuery,
  validateModel,
} from "../middlewares/games.js";
import { getGames, postGame } from "../controllers/games.js";

const gamesRoutes = Router();

gamesRoutes.get("/games", checkQuery, getGames);
gamesRoutes.post("/games", validateModel, checkExistence, postGame);

export default gamesRoutes;
