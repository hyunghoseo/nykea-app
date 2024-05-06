const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");
const constructor = require("../../helpers/constructor");

describe("User Info Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    it("[Create] Public user should not post user-info", async () => {
        await request(strapi.server.httpServer)
            .post("/api/user-infos")
            .set("accept", "application/json")
            .send(constructor.constructUserInfo(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Authenticated user should not post user-info", async () => {
        await request(strapi.server.httpServer)
            .post("/api/user-infos")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructor.constructUserInfo(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Admin user should post user-info", async () => {
        await request(strapi.server.httpServer)
            .post("/api/user-infos")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructUserInfo(3))
            .expect("Content-Type", /json/)
            .expect(200)

        await request(strapi.server.httpServer)
            .post("/api/user-infos")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructUserInfo(4))
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("[Find] Public user should not find user-infos", async () => {
        await request(strapi.server.httpServer)
            .get("/api/user-infos?locale=en")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(500)
    });

    it("[Find] Authenticated user should find user-infos", async () => {
        await request(strapi.server.httpServer)
            .get("/api/user-infos?locale=en")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length >= 2).toBe(true);
            });
    });

    it("[Find] Admin user should find user-infos", async () => {
        await request(strapi.server.httpServer)
            .get("/api/user-infos?locale=en")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length >= 2).toBe(true);
            });
    });

    it("[FindOne] Public user should not find a user-info", async () => {
        await request(strapi.server.httpServer)
            .get("/api/user-infos/" + 1)
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(500)
    });

    it("[FindOne] Authenticated user should find a user-info", async () => {
        const id = 1;
        const userInfo = constructor.constructUserInfo(id)
        await request(strapi.server.httpServer)
            .get("/api/user-infos/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.DisplayName).toBe(userInfo.data.DisplayName);
                expect(data.attributes.FirstName).toBe(userInfo.data.FirstName);
                expect(data.attributes.LastName).toBe(userInfo.data.LastName);
                expect(data.attributes.MiddleName).toBe(userInfo.data.MiddleName);
                expect(data.attributes.locale).toBe(userInfo.data.locale);
            })
    });

    it("[FindOne] Admin user should find a user-info", async () => {
        const id = 1;
        const userInfo = constructor.constructUserInfo(id)
        await request(strapi.server.httpServer)
            .get("/api/user-infos/" + 1 + "?locale=en")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.DisplayName).toBe(userInfo.data.DisplayName);
                expect(data.attributes.FirstName).toBe(userInfo.data.FirstName);
                expect(data.attributes.LastName).toBe(userInfo.data.LastName);
                expect(data.attributes.MiddleName).toBe(userInfo.data.MiddleName);
                expect(data.attributes.locale).toBe(userInfo.data.locale);
            })
    });
})
