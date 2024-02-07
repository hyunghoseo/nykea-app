const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");

describe("Support Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        console.log("Support before all");
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    /**
     * @param {string | number} id
     */
    const constructSupportTicket = (id) => {
        return {
            data: {
                "FullName": "Test Name" + id,
                "Email": "test" + id + "@email.com",
                "Phone": "111-111-1111",
                "Title": "Test Title" + id,
                "Message": "Test Message" + id,
                "DateSubmitted": Date.now(),
                "Status": "Submitted", // "Under Review" or "Completed"
                "Memo": "Test Memo" + id,
                "DateCompleted": Date.now(),
                "locale": "en"
            }
        };
    }


    it("Public user should not post group", async () => {
        await request(strapi.server.httpServer)
            .post("/api/groups")
            .set("accept", "application/json")
            .send(constructGroup(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("Authenticated user should not post group", async () => {
        await request(strapi.server.httpServer)
            .post("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructGroup(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("Admin user should post groups", async () => {
        await request(strapi.server.httpServer)
            .post("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructGroup(1))
            .expect("Content-Type", /json/)
            .expect(200)

        await request(strapi.server.httpServer)
            .post("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructGroup(1))
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("Public user should find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("Authenticated user should find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("Admin user should find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("Public user should find a group", async () => {
        const id = 1;
        const group = constructGroup(id);
        await request(strapi.server.httpServer)
            .get("/api/groups/" + 1)
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Name).toBe(group.data.Name);
                expect(data.attributes.ShortDescription).toBe(group.data.ShortDescription);
                expect(data.attributes.locale).toBe(group.data.locale);
            })
    });

    it("Authenticated user should find a group", async () => {
        const id = 1;
        const group = constructGroup(id);
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
                expect(data.attributes.locale).toBe(group.data.locale);
            })
    });

    it("Admin user should find a group", async () => {
        const id = 1;
        const group = constructGroup(id);
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
                expect(data.attributes.locale).toBe(group.data.locale);
            })
    });
})