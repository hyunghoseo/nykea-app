const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");

let publicUser;
let authenticatedUser;
let adminUser;
beforeAll(async () => {
    publicUser = await userFactory.createUser(strapi, "public");
    authenticatedUser = await userFactory.createUser(strapi, "authenticated");
    adminUser = await userFactory.createUser(strapi, "admin");
});

/**
 * @param {string | number} id
 */
const constructGroup = (id) => {
    return {
        data: {
            "Name": "Test Group " + id,
            "ShortDescription": "Group Description" + id,
            "Picture": null,
            "locale": "en",
            "publishedAt": Date.now(),
        }
    };
}

describe("Group Permission Test", () => {

    it("Public user should find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(publicUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
    });

    it("Authenticated user should find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
    });

    it("Admin user should find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
    });

    it("Public user should not post group", async () => {
        await request(strapi.server.httpServer)
            .post("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(publicUser.id)}`)
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
    })

    it("Public user should find a group", async () => {
        const id = 1;
        const group = constructGroup(1);
        await request(strapi.server.httpServer)
            .get("/api/groups/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(publicUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
    });

    it("Authenticated user should find a group", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
    });

    it("Admin user should find a group", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
    });
})

describe("Group Service Test", () => {

    it("Create groups", async () => {
        await request(strapi.server.httpServer)
            .post("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructGroup(1))
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("Find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(publicUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("Find a group", async () => {
        const id = 1;
        const group = constructGroup(id);
        await request(strapi.server.httpServer)
            .get("/api/groups/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(publicUser.id)}`)
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