import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import gamesRoutes from "./routes/games.routes.js";
import rentalRoutes from "./routes/rentals.routes.js";
import customerRoutes from "./routes/customers.routes.js";
import categorieRoutes from "./routes/categories.routes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(categorieRoutes);
app.use(gamesRoutes);
app.use(customerRoutes);
app.use(rentalRoutes);

app.listen(process.env.PORT || 4000, () => console.log("Running"));
