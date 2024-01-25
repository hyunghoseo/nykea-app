const Strapi = require("@strapi/strapi");
const fs = require("fs");

let instance;

/**
 * Setups strapi for futher testing
 */
async function setupStrapi() {
  if (!instance) {
    await Strapi().load();
    instance = strapi; // strapi is global now

    await instance.server.mount();
  }
  return instance;
}

/**
 * Returns valid JWT token for authenticated
 * @param {String | number} idOrEmail, either user id, or email
 */
const jwt = async (idOrEmail) =>
  strapi.plugins["users-permissions"].services.jwt.issue({
    [Number.isInteger(idOrEmail) ? "id" : "email"]: idOrEmail,
  });

/**
 * Clean up strapi after testing
 */
async function cleanupStrapi() {
  const dbSettings = strapi.config.get("database.connection");

  //close server to release the db-file
  await strapi.server.httpServer.close();

  // close the connection to the database before deletion
  await strapi.db.connection.destroy();

  //delete test database after all tests have completed
  if (dbSettings && dbSettings.connection && dbSettings.connection.filename) {
    const tmpDbFile = dbSettings.connection.filename;
    if (tmpDbFile.endsWith("test.db") && fs.existsSync(tmpDbFile)) {
      console.log("test.db DELETED")
      fs.unlinkSync(tmpDbFile);
    }
  }
}

module.exports = { setupStrapi, cleanupStrapi, jwt };