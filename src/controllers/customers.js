import connection from "../database/BoardCamp.js";

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCustomers(req, res) {
  try {
    const customers = await connection.query("SELECT * FROM customers");
    res.send(customers.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCusotmerById(req, res) {
  const { id } = req.params;
  try {
    const customer = await connection.query(
      "SELECT * FROM customers WHERE id=$1",
      [id]
    );
    if (customer.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.send(customer.rows[0]);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;
  try {
    await connection.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5",
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
