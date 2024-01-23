const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");

describe("Church-Info Test", () => {

    let publicUser;
    let authenticatedUser;
    beforeAll(async () => {
        publicUser = await userFactory.createUser(strapi, 2);
        authenticatedUser = await userFactory.createUser(strapi, 1);
    });

    it("Public user should find church-info", async () => {
        await request(strapi.server.httpServer)
            .get("/api/church-info")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(publicUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200) // Expect response http code 200
            .then((data) => {
                console.log(data.body)
            });
    });
})