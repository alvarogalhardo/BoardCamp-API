import connection from "../database/BoardCamp.js";

export async function postGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    const posted = await connection.query(
      'INSERT INTO "games" ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    console.log(posted);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getGames(req, res) {
  try {
    const result = await connection.query(
      'SELECT games.*, categories.name AS categoryName FROM games JOIN categories ON games."categoryId" = categories.id'
    );
    res.send(result.rows)
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
