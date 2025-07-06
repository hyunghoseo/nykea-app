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

// Configure your database connection here:
const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

// Generate sample announcements with i18n support and "[Test]" in their titles
const announcements = [];

// Number of announcements per locale (change as needed)
const announcementsPerLocale = 20;

// Generate announcements for English and Korean locales
for (let i = 1; i <= announcementsPerLocale; i++) {
  const now = new Date().toISOString();
  // English announcement
  announcements.push({
    locale: "en",
    title: `[Test] Announcement ${i}`,
    description: [
      {
        type: "paragraph",
        children: [
          {
            text: `This is test announcement ${i} in English.`,
            type: "text",
          },
        ],
      },
      {
        type: "paragraph",
        children: [{ text: "", type: "text" }],
      },
      {
        type: "paragraph",
        children: [{ text: "Details:", type: "text" }],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "- This announcement was generated automatically.",
            type: "text",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          { text: "- It includes multiple lines of content.", type: "text" },
        ],
      },
      {
        type: "paragraph",
        children: [
          { text: "- You can use it for testing purposes.", type: "text" },
        ],
      },
      {
        type: "paragraph",
        children: [{ text: "", type: "text" }],
      },
      {
        type: "paragraph",
        children: [{ text: "Thank you for reading.", type: "text" }],
      },
    ],
    published_at: now,
    created_at: now,
    updated_at: now,
  });

  // Korean announcement
  announcements.push({
    locale: "ko",
    title: `[테스트] 공지사항 ${i}`,
    description: [
      {
        type: "paragraph",
        children: [
          {
            text: `이것은 한국어로 작성된 테스트 공지사항 ${i}입니다.`,
            type: "text",
          },
        ],
      },
      {
        type: "paragraph",
        children: [{ text: "", type: "text" }],
      },
      {
        type: "paragraph",
        children: [{ text: "세부 정보:", type: "text" }],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "- 이 공지사항은 자동으로 생성되었습니다.",
            type: "text",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "- 여러 줄의 내용을 포함하고 있습니다.",
            type: "text",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "- 테스트 목적으로 사용할 수 있습니다.",
            type: "text",
          },
        ],
      },
      {
        type: "paragraph",
        children: [{ text: "", type: "text" }],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "읽어주셔서 감사합니다.",
            type: "text",
          },
        ],
      },
    ],
    published_at: now,
    created_at: now,
    updated_at: now,
  });
}

async function populateAnnouncements() {
  // Get a client connection from the pool
  const client = await pool.connect();

  try {
    // Begin transaction
    await client.query("BEGIN");

    // Adjust the table name and columns as needed.
    // Here we assume the table is called "announcements".
    const insertQuery = `
      INSERT INTO announcements 
      (locale, title, Description, published_at, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    for (const announcement of announcements) {
      await client.query(insertQuery, [
        announcement.locale,
        announcement.title,
        JSON.stringify(announcement.description),
        announcement.published_at,
        announcement.created_at,
        announcement.updated_at,
      ]);
    }

    // Commit the transaction
    await client.query("COMMIT");
    console.log("Announcements populated successfully.");
  } catch (error) {
    // Roll back any changes if something goes wrong
    await client.query("ROLLBACK");
    console.error("Error populating announcements:", error);
  } finally {
    // Release the client back to the pool
    client.release();
  }
}

// Run the function and catch any unexpected errors
populateAnnouncements().catch((err) => console.error("Unexpected error:", err));
