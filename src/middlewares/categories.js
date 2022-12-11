import connection from "../database/BoardCamp.js";

export function checkName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.sendStatus(400);
  }
  next();
}

export async function checkExistence(req, res, next) {
  const { name } = req.body;
  try {
    const exists = await connection.query("SELECT * FROM categories WHERE name=$1", [
      name,
    ]);
    if (exists.rowCount > 0 && exists.rows[0].name === name)
      return res.sendStatus(409);
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
