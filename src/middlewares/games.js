import connection from "../database/BoardCamp.js";
import gameModel from "../models/games.js";

export function validateModel(req, res, next) {
  const { error } = gameModel.validate(req.body);
  if (error) {
    res.send(error.details.map((d) => d.message)).status(400);
  }
  next();
}

export async function checkExistence(req, res, next) {
  const { categoryId, name } = req.body;
  try {
    const categoryExists = await connection.query(
      "SELECT * FROM categories WHERE id=$1",
      [categoryId]
    );
    if (!categoryExists.rowCount > 0) {
      return res.sendStatus(400);
    }
    const gameExists = await connection.query("SELECT * FROM games WHERE name=$1", [
      name,
    ]);
    if (gameExists.rowCount > 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function checkQuery(req, res, next) {
  const query = req.query.name;
  if (query) {
    const result = await connection.query("SELECT * FROM games WHERE name ILIKE $1",[`${query}%`]);
    return res.send(result.rows)
  }
  next()
}
