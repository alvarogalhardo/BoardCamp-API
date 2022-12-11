import connection from "../database/BoardCamp.js";

export async function postRental(req, res) {
  const { postObj } = res.locals;
  const {
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee,
  } = postObj;
  try {
    await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getRentals(req, res) {
  try {
    const allRentals = await connection.query("SELECT * FROM rentals");
    const result = allRentals.rows.map(async (r) => {
      console.log(r);
      const customer = await connection.query(
        "SELECT name FROM customers WHERE id=$1",
        [r.customerId]
      );
      const game = await connection.query(
        'SELECT id, name, "categoryId", "categoryId" AS "categoryName" FROM games WHERE id=$1',
        [r.gameId]
      );
      return {
        ...r,
        customer: customer.rows[0],
        game: game.rows[0],
      };
    });
    console.log(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM rentals WHERE id=$1", [id]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
