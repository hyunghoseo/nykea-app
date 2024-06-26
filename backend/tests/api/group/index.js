const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");
const constructor = require("../../helpers/constructor");

describe("Group Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    it("[Create] Public user should not post group", async () => {
        await request(strapi.server.httpServer)
            .post("/api/groups")
            .set("accept", "application/json")
            .send(constructor.constructGroup(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Authenticated user should not post group", async () => {
        await request(strapi.server.httpServer)
            .post("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructor.constructGroup(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Admin user should post groups", async () => {
        await request(strapi.server.httpServer)
            .post("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructGroup(1))
            .expect("Content-Type", /json/)
            .expect(200)

        await request(strapi.server.httpServer)
            .post("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructGroup(1))
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("[Find] Public user should find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups?locale=en")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("[Find] Authenticated user should find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups?locale=en")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("[Find] Admin user should find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups?locale=en")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("[FindOne] Public user should find a group", async () => {
        const id = 1;
        const group = constructor.constructGroup(id);
        await request(strapi.server.httpServer)
            .get("/api/groups/" + 1)
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Name).toBe(group.data.Name);
                expect(data.attributes.ShortDescription).toBe(group.data.ShortDescription);
                expect(data.attributes.Type).toBe(group.data.Type);
                expect(data.attributes.locale).toBe(group.data.locale);
            })
    });

    it("[FindOne] Authenticated user should find a group", async () => {
        const id = 1;
        const group = constructor.constructGroup(id);
        await request(strapi.server.httpServer)
            .get("/api/groups/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Name).toBe(group.data.Name);
                expect(data.attributes.ShortDescription).toBe(group.data.ShortDescription);
                expect(data.attributes.Type).toBe(group.data.Type);
                expect(data.attributes.locale).toBe(group.data.locale);
            })
    });

    it("[FindOne] Admin user should find a group", async () => {
        const id = 1;
        const group = constructor.constructGroup(id);
        await request(strapi.server.httpServer)
            .get("/api/groups/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Name).toBe(group.data.Name);
                expect(data.attributes.ShortDescription).toBe(group.data.ShortDescription);
                expect(data.attributes.Type).toBe(group.data.Type);
                expect(data.attributes.locale).toBe(group.data.locale);
            })
    });
})
