const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");
const constructor = require("../../helpers/constructor");

describe("Announcement Test", () => {
    let authenticatedUser;
    let adminUser;

    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    })

    // Create
    it("[Create] Public user should not post Announcements", async () => {
        await request(strapi.server.httpServer)
            .post("/api/announcements")
            .set("accept", "application/json")
            .send(constructor.constructAnnouncement(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Authenticated user should not post Announcements", async () => {
        await request(strapi.server.httpServer)
            .post("/api/announcements")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructor.constructAnnouncement(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Admin user should post Announcements", async () => {
        const announcement = constructor.constructAnnouncement(1);
        await request(strapi.server.httpServer)
            .post("/api/announcements")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructAnnouncement(1))
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(announcement.data.Title);
                expect(data.attributes.Description).toStrictEqual(announcement.data.Description);
                expect(data.attributes.Private).toBe(announcement.data.Private);
                expect(data.attributes.locale).toBe(announcement.data.locale);
            })
    })

    // Find
    it("[Find] Public user should find Announcements", async () => {
        await request(strapi.server.httpServer)
            .get("/api/announcements")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(1);
            })
    })

    it("[Find] Authenticated user should find Announcements", async () => {
        await request(strapi.server.httpServer)
            .get("/api/announcements")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(1);
            })
    })

    it("[Find] Admin user should find Announcements", async () => {
        await request(strapi.server.httpServer)
            .get("/api/announcements/")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(1);
            })
    })

    // FindOne
    it("[FindOne] Public user should find an announcement", async () => {
        const id = 1;
        const announcement = constructor.constructAnnouncement(id);
        await request(strapi.server.httpServer)
            .get("/api/announcements/" + id)
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(announcement.data.Title);
                expect(data.attributes.Description).toStrictEqual(announcement.data.Description);
                expect(data.attributes.Private).toBe(announcement.data.Private);
                expect(data.attributes.locale).toBe(announcement.data.locale);
            })
    })

    it("[FindOne] Authenticated user should find an announcement", async () => {
        const id = 1;
        const announcement = constructor.constructAnnouncement(id);
        await request(strapi.server.httpServer)
            .get("/api/announcements/" + id)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(announcement.data.Title);
                expect(data.attributes.Description).toStrictEqual(announcement.data.Description);
                expect(data.attributes.Private).toBe(announcement.data.Private);
                expect(data.attributes.locale).toBe(announcement.data.locale);
            })
    })

    it("[FindOne] Admin user should find an announcement", async () => {
        const id = 1;
        const announcement = constructor.constructAnnouncement(id);
        await request(strapi.server.httpServer)
            .get("/api/announcements/" + id)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(announcement.data.Title);
                expect(data.attributes.Description).toStrictEqual(announcement.data.Description);
                expect(data.attributes.Private).toBe(announcement.data.Private);
                expect(data.attributes.locale).toBe(announcement.data.locale);
            })
    })

    // Update
    it("[Update] Public user should not update Announcements", async () => {
        const id = 1;
        await request(strapi.server.httpServer)
            .put("/api/announcements/" + id)
            .set("accept", "application/json")
            .set('Content-Type', 'application/json')
            .send(constructor.constructAnnouncement(3))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Update] Authenticated user should not update Announcements", async () => {
        const id = 1;
        await request(strapi.server.httpServer)
            .put("/api/announcements/" + id)
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .set('Content-Type', 'application/json')
            .send(constructor.constructAnnouncement(3))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Update] Admin user should update Announcements", async () => {
        const id = 1;
        const announcement = constructor.constructAnnouncement(3);
        await request(strapi.server.httpServer)
            .put("/api/announcements/" + id)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructAnnouncement(3))
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(announcement.data.Title);
                expect(data.attributes.Description).toStrictEqual(announcement.data.Description);
                expect(data.attributes.Private).toBe(announcement.data.Private);
                expect(data.attributes.locale).toBe(announcement.data.locale);
            })
    })
})

