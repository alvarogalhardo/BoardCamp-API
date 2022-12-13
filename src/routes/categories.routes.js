import { Router } from "express";
import { getCategories, postCategories } from "../controllers/categories.js";
import { checkExistence, checkName } from "../middlewares/categories.js";

const categorieRoutes = Router();

categorieRoutes.get("/categories", getCategories);
categorieRoutes.post("/categories", checkName, checkExistence, postCategories);

export default categorieRoutes;
