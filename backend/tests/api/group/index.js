const request = require('supertest');
const { getFullAPIToken } = require("../../helpers/strapi");

describe("Group Test", () => {

    it("should return hello world", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${getFullAPIToken()}`)
            .expect("Content-Type", /json/)
            .expect(200) // Expect response http code 200
            .then((data) => {

            });
    });
})