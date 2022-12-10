import pkg from "pg";

const { Pool } = pkg;
const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "91Dc001832//",
  database: "boardcamp",
});

export default db;
