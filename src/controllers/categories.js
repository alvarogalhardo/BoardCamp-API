import connection from "../database/BoardCamp.js";

export async function getCategories(req, res) {
  try {
    const categories = await connection.query("SELECT * FROM categories");
    res.send(categories.rows).status(200);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function postCategories(req, res) {
  const { name } = req.body;
  try {
    const posted = await connection.query(
      "INSERT INTO categories (name) VALUES ($1)",
      [name]
    );
    console.log(posted);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
