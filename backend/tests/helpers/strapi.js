const Strapi = require("@strapi/strapi");
const fs = require("fs");

let instance;
let apiToken;

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

const getRandomID = () => {
  return Math.round(Math.random() * 10000).toString();
};

const getFullAPIToken = async () => {
  if (!apiToken) {
    const tokenService = strapi.service("admin::api-token");

    const attributes = {
      name: `token${getRandomID()}`,
      description: "",
      type: "full-access",
      lifespan: null,
    };
    apiToken = await tokenService.create(attributes);
  }
  return apiToken.accessKey;
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
 * Grants database `permissions` table that role can access an endpoint/controllers
 *
 * @param {int} roleID, 1 Autentihected, 2 Public, etc
 * @param {string} value, in form or dot string eg `"permissions.users-permissions.controllers.auth.changepassword"`
 * @param {boolean} enabled, default true
 * @param {string} policy, default ''
 */
const grantPrivilege = async (
  roleID = 1,
  value,
  enabled = true,
  policy = ""
) => {
  const updateObj = value
    .split(".")
    .reduceRight((obj, next) => ({ [next]: obj }), { enabled, policy });

  return await strapi.plugins[
    "users-permissions"
  ].services.userspermissions.updateRole(roleID, updateObj);
};

/** Updates database `permissions` that role can access an endpoint
 * @see grantPrivilege
 */

const grantPrivileges = async (roleID = 1, values = []) => {
  values.forEach((value) => grantPrivilege(roleID, value));
};


async function cleanupStrapi() {
  const dbSettings = strapi.config.get("database.connection");

  //close server to release the db-file
  await strapi.server.httpServer.close();

  // close the connection to the database before deletion
  await strapi.db.connection.destroy();

  //delete test database after all tests have completed
  if (dbSettings && dbSettings.connection && dbSettings.connection.filename) {
    const tmpDbFile = dbSettings.connection.filename;
    if (tmpDbFile == "test.db" && fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
}

module.exports = { setupStrapi, cleanupStrapi, grantPrivilege, getFullAPIToken };