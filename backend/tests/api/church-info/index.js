const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");

describe("Church Info Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        console.log("Church Info before all");
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    /**
     * @param {string | number} id
     */

    const constructChurchInfo = (id) => {
        return {
            data: {
                "ChurchName": "Test Name " + id,
                "Phone": "000-000-0000",
                "Email": "test" + id + "@test.com",
                "Address": id + "north haledon",
                "PrivatePolicy": "policy" + id,
                "locale": "en",
                "publishedAt": Date.now(),
            }
        };
    }

    it("Public user should not put church-info", async () => {
        await request(strapi.server.httpServer)
            .put("/api/church-info") //strapi uses put for single type
            .set("accept", "application/json")
            .send(constructChurchInfo(0))
            .expect("Content-Type", /json/)
            .expect(500)
    });

    it("Authenticated user should not put church-info", async () => {
        await request(strapi.server.httpServer)
            .put("/api/church-info") //strapi uses put for single type
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructChurchInfo(0))
            .expect("Content-Type", /json/)
            .expect(500)
    });

    it("Admin user should put church-info", async () => {
        await request(strapi.server.httpServer)
            .put("/api/church-info") //strapi uses put for single type
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructChurchInfo(1))
            .expect("Content-Type", /json/)
            .expect(200)   
    });

    it("Public user should find church-info", async () => {
        const id = 1;
        const churchInfo = constructChurchInfo(id);
        await request(strapi.server.httpServer)
            .get("/api/church-info")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.ChurchName).toBe(churchInfo.data.ChurchName);
                expect(data.attributes.Phone).toBe(churchInfo.data.Phone);
                expect(data.attributes.Email).toBe(churchInfo.data.Email);
                expect(data.attributes.Address).toBe(churchInfo.data.Address);
                expect(data.attributes.PrivatePolicy).toBe(churchInfo.data.PrivatePolicy);
                expect(data.attributes.locale).toBe(churchInfo.data.locale);
            });
    });

    it("Authenticated user should find church-info", async () => {
        const id = 1;
        const churchInfo = constructChurchInfo(id);
        await request(strapi.server.httpServer)
            .get("/api/church-info")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.ChurchName).toBe(churchInfo.data.ChurchName);
                expect(data.attributes.Phone).toBe(churchInfo.data.Phone);
                expect(data.attributes.Email).toBe(churchInfo.data.Email);
                expect(data.attributes.Address).toBe(churchInfo.data.Address);
                expect(data.attributes.PrivatePolicy).toBe(churchInfo.data.PrivatePolicy);
                expect(data.attributes.locale).toBe(churchInfo.data.locale);
            });
    });

    it("Admin user should find church-info", async () => {
        const id = 1;
        const churchInfo = constructChurchInfo(id);
        await request(strapi.server.httpServer)
            .get("/api/church-info")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.ChurchName).toBe(churchInfo.data.ChurchName);
                expect(data.attributes.Phone).toBe(churchInfo.data.Phone);
                expect(data.attributes.Email).toBe(churchInfo.data.Email);
                expect(data.attributes.Address).toBe(churchInfo.data.Address);
                expect(data.attributes.PrivatePolicy).toBe(churchInfo.data.PrivatePolicy);
                expect(data.attributes.locale).toBe(churchInfo.data.locale);
            });
    });
})