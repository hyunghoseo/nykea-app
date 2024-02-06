const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");

jest.setTimeout(10000);

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});

require('./api/banner');
require('./api/group');
<<<<<<< HEAD
require('./api/leader');
require('./api/user');
require('./api/user-info');
=======
require('./api/user');
require('./api/support');
>>>>>>> 28832a0 (created test index.js for support)
