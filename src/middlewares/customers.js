import customerModel from "../models/customers.js";
import connection from "../database/BoardCamp.js";

export async function checkQuery(req, res, next) {
  const { cpf } = req.query;
  if (cpf) {
    const result = await connection.query(
      "SELECT * FROM customers WHERE cpf LIKE $1",
      [`${cpf}%`]
    );
    return res.send(result.rows);
  }
  next();
}

export function validateModel(req, res, next) {
  const { error } = customerModel.validate(req.body);
  if (error) {
    const result = error.details.map((d) => d.message);
    console.log(result);
    return res.sendStatus(400);
  }
  next();
}

export async function checkExists(req, res, next) {
  const { cpf } = req.body;
  try {
    const exists = await connection.query(
      "SELECT * FROM customers WHERE cpf=$1",
      [cpf]
    );
    if (exists.rowCount > 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
