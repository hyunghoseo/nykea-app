const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");
const constructor = require("../../helpers/constructor");

describe("Church Info Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    it("[Update] Public user should not put church-info", async () => {
        await request(strapi.server.httpServer)
            .put("/api/church-info") //strapi uses put for single type
            .set("accept", "application/json")
            .send(constructor.constructChurchInfo(0))
            .expect("Content-Type", /json/)
            .expect(500)
    });

    it("[Update] Authenticated user should not put church-info", async () => {
        await request(strapi.server.httpServer)
            .put("/api/church-info") //strapi uses put for single type
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructor.constructChurchInfo(0))
            .expect("Content-Type", /json/)
            .expect(500)
    });

    it("[Update] Admin user should put church-info", async () => {
        await request(strapi.server.httpServer)
            .put("/api/church-info") //strapi uses put for single type
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructChurchInfo(1))
            .expect("Content-Type", /json/)
            .expect(200)   
    });

    it("[Find] Public user should find church-info", async () => {
        const id = 1;
        const churchInfo = constructor.constructChurchInfo(id);
        await request(strapi.server.httpServer)
            .get("/api/church-info?locale=en")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.ChurchName).toBe(churchInfo.data.ChurchName);
                expect(data.attributes.Phone).toBe(churchInfo.data.Phone);
                expect(data.attributes.Email).toBe(churchInfo.data.Email);
                expect(data.attributes.Address).toBe(churchInfo.data.Address);
                expect(data.attributes.locale).toBe(churchInfo.data.locale);
            });
    });

    it("[Find] Authenticated user should find church-info", async () => {
        const id = 1;
        const churchInfo = constructor.constructChurchInfo(id);
        await request(strapi.server.httpServer)
            .get("/api/church-info?locale=en")
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
                expect(data.attributes.locale).toBe(churchInfo.data.locale);
            });
    });

    it("[Find] Admin user should find church-info", async () => {
        const id = 1;
        const churchInfo = constructor.constructChurchInfo(id);
        await request(strapi.server.httpServer)
            .get("/api/church-info?locale=en")
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
                expect(data.attributes.locale).toBe(churchInfo.data.locale);
            });
    });
})