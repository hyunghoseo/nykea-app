const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");
const constructor = require("../../helpers/constructor");

describe("Leader Test", () => {
    let authenticatedUser;
    let adminUser;

    let pastor;
    let chairman;
    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
        await request(strapi.server.httpServer)
            .post("/api/user-infos")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructUserInfo(1))
            .then((data) => {
                pastor = data.body.data
            });

        await request(strapi.server.httpServer)
            .post("/api/user-infos")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructUserInfo(2))
            .then((data) => {
                chairman = data.body.data
            });
    });

    it("[Create] Public user should not post leader", async () => {
        await request(strapi.server.httpServer)
            .post("/api/leaders")
            .set("accept", "application/json")
            .send(constructor.constructLeader(0, pastor.id))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Authenticated user should not post group", async () => {
        await request(strapi.server.httpServer)
            .post("/api/leaders")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructor.constructLeader(0, pastor.id))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Admin user should post leaders", async () => {
        const leaderPastor = constructor.constructLeader(1, pastor.id);
        await request(strapi.server.httpServer)
            .post("/api/leaders")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(leaderPastor)
            .expect("Content-Type", /json/)
            .expect(200)

        const leaderChairman = constructor.constructLeader(2, chairman.id);
        await request(strapi.server.httpServer)
            .post("/api/leaders")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(leaderChairman)
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("[Find] Public user should not find leaders", async () => {
        await request(strapi.server.httpServer)
            .get("/api/leaders?locale=en")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(500)
    });

    it("[Find] Authenticated user should find leaders", async () => {
        await request(strapi.server.httpServer)
            .get("/api/leaders?locale=en")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("[Find] Admin user should find leaders", async () => {
        await request(strapi.server.httpServer)
            .get("/api/leaders?locale=en")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("[FindOne] Public user should not find a leader", async () => {
        await request(strapi.server.httpServer)
            .get("/api/leaders/" + 1)
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(500)

    });

    it("[FindOne] Authenticated user should find a leader", async () => {
        const leader = constructor.constructLeader(1, pastor.id);
        await request(strapi.server.httpServer)
            .get("/api/leaders/" + 1 + "?populate[0]=FullName")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data.attributes;
                const fullName = data.FullName.data.attributes;

                expect(data.StartYear).toBe(leader.data.StartYear);
                expect(data.EndYear).toBe(leader.data.EndYear);
                expect(data.Title).toBe(leader.data.Title);
                expect(data.locale).toBe(leader.data.locale);

                expect(fullName.DisplayName).toBe(pastor.attributes.DisplayName);
                expect(fullName.FirstName).toBe(pastor.attributes.FirstName);
                expect(fullName.LastName).toBe(pastor.attributes.LastName);
                expect(fullName.MiddleName).toBe(pastor.attributes.MiddleName);
            })
    });

    it("[FindOne] Admin user should find a leader", async () => {
        const leader = constructor.constructLeader(2, chairman.id);
        await request(strapi.server.httpServer)
            .get("/api/leaders/" + 2 + "?populate[0]=FullName")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data.attributes;
                const fullName = data.FullName.data.attributes;

                expect(data.StartYear).toBe(leader.data.StartYear);
                expect(data.EndYear).toBe(leader.data.EndYear);
                expect(data.Title).toBe(leader.data.Title);
                expect(data.locale).toBe(leader.data.locale);

                expect(fullName.DisplayName).toBe(chairman.attributes.DisplayName);
                expect(fullName.FirstName).toBe(chairman.attributes.FirstName);
                expect(fullName.LastName).toBe(chairman.attributes.LastName);
                expect(fullName.MiddleName).toBe(chairman.attributes.MiddleName);
            })
    });
})
