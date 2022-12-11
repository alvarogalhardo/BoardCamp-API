import connection from "../database/BoardCamp.js";
import rentalModel from "../models/rentals.js";
import dayjs from "dayjs";

export function validateModel(req, res, next) {
  const { error } = rentalModel.validate(req.body);
  if (error) {
    const result = error.details.map((d) => d.message);
    console.log(result);
    return res.sendStatus(400);
  }
  next();
}

export async function checkExists(req, res, next) {
  const { customerId, gameId } = req.body;
  try {
    const customerExists = await connection.query(
      "SELECT * FROM customers WHERE id=$1",
      [customerId]
    );
    if (customerExists.rowCount === 0) {
      res.sendStatus(400);
    }
    const gameExists = await connection.query(
      "SELECT * FROM games WHERE id=$1",
      [gameId]
    );
    if (gameExists.rowCount === 0) {
      res.sendStatus(400);
    }
    res.locals.customer = customerExists.rows[0];
    res.locals.game = gameExists.rows[0];
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export function createPostObject(req, res, next) {
  const { daysRented } = req.body;
  const { pricePerDay } = res.locals.game;
  const originalPrice = daysRented * pricePerDay;
  const rentDate = dayjs().format("YYYY-MM-DD");
  const returnDate = null;
  const delayFee = null;
  const postObj = {
    ...req.body,
    originalPrice,
    rentDate,
    returnDate,
    delayFee,
  };
  res.locals.postObj = postObj;
  next();
}

export async function checkRentals(req, res, next) {
  const { gameId } = req.body;
  const { stockTotal } = res.locals.game;
  try {
    const rentals = await connection.query(
      'SELECT * FROM rentals WHERE "gameId"=$1',
      [gameId]
    );
    if (rentals.rowCount > stockTotal) {
      return res.sendStatus(400);
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function checkQuery(req, res, next) {
  const { customerId } = req.query;
  if (customerId) {
    try {
      const customerRentals = await connection.query(
        'SELECT * FROM rentals WHERE "customerId"=$1',
        [customerId]
      );
      res.send(customerRentals.rows);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  const { gameId } = req.query;
  if (gameId) {
    try {
      const gameRentals = await connection.query(
        'SELECT * FROM rentals WHERE "gameId"=$1',
        [gameId]
      );
      res.send(gameRentals.rows);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  next();
}

export async function checkId(req, res, next) {
  const { id } = req.params;
  try {
    const exists = await connection.query("SELECT * FROM rentals WHERE id=$1", [
      id,
    ]);
    if (exists.rowCount === 0) {
      res.sendStatus(404);
    } else if (exists.rows[0].returnDate !== null) {
      res.sendStatus(400);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
