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
    const allRentals = await connection.query(`SELECT * FROM rentals`);
    const games = await connection.query(`SELECT * FROM games`);
    const customers = await connection.query(`SELECT * FROM customers`);
    const send = allRentals.rows.map((rental) => {
      return {
        ...rental,
        customer: customers.rows.find(c => c.id === rental.customerId),
        game: games.rows.find(g => g.id === rental.gameId),
      };
    });
    res.send(send)
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
