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
      "SELECT * FROM rentals WHERE 'gameId'=$1",
      [gameId]
    );
    if (rentals.rowCount > stockTotal) {
      res.sendStatus(400);
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
