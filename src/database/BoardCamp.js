import pkg from "pg";

const { Pool } = pkg;
const connection = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "91Dc001832//",
  database: "boardcamp",
  // connectionString:process.env.DATABASE_URL
});

export default connection;
