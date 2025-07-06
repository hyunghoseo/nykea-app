require("dotenv").config();
const { Pool } = require("pg");

// Retrieve and parse environment variables
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_DATABASE) {
  console.error(
    "Error: One or more required environment variables are missing."
  );
  process.exit(1);
}

console.log(
  `Connecting to database at ${DB_HOST}:${DB_PORT} using database "${DB_DATABASE}"`
);

// Create a new PostgreSQL connection pool using environment variables
const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

async function deleteTestAnnouncements() {
  const client = await pool.connect();

  try {
    // Start a transaction
    await client.query("BEGIN");

    // Delete announcements whose title starts with '[Test]'
    const deleteQuery = `
      DELETE FROM announcements
      WHERE title LIKE $1 or title LIKE $2
    `;

    const result = await client.query(deleteQuery, ["[Test]%", "[테스트]%"]);

    // Commit the transaction
    await client.query("COMMIT");

    console.log(`Deleted ${result.rowCount} test announcements.`);
  } catch (error) {
    // Roll back in case of any error
    await client.query("ROLLBACK");
    console.error("Error deleting test announcements:", error);
  } finally {
    client.release();
  }
}

// Execute the script
deleteTestAnnouncements().catch((err) =>
  console.error("Unexpected error:", err)
);
