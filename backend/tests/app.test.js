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
require('./api/leader');
require('./api/user');
require('./api/user-info');
