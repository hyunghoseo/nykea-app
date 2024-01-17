const request = require('supertest');
const userFactory = require("../../user/factory");
const { jwt, grantPrivilege } = require("../../helpers/strapi");

describe("Group Test", () => {
    let user;

    beforeAll(async (done) => {
        user = await userFactory.createUser(strapi);
        await grantPrivilege(2, "permissions.application.controllers.group.find");
        done();
    })

    it("should return hello world", async () => {
        await request(strapi.server.httpServer)
            // @ts-ignore
            .get("/api/groups")
            .expect(200) // Expect response http code 200
            .then((data) => {

            });
    });
})