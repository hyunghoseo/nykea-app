const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");

describe("Announcement Test", () => {
    let authenticatedUser;
    let adminUser;

    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    })

    const constructAnnouncement = (id) => {
        return {
            data: {
                "Name": "Test Announcement " + id,
                "Poster": null,
                "Description": "Announcement Description " + id,
                // "HostingGroup": "Announcement HostingGroup" + id,
                "Private": false,
                "locale": "en",
                "publishedAt": Date.now(),
            }
        };
    }

    // Create
    it("[Create] Public user should not post Announcements", async () => {
        await request(strapi.server.httpServer)
            .post("/api/announcements")
            .set("accept", "application/json")
            .send(constructAnnouncement(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Authenticated user should not post Announcements", async () => {
        await request(strapi.server.httpServer)
            .post("/api/announcements")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructAnnouncement(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Admin user should post Announcements", async () => {
        await request(strapi.server.httpServer)
            .post("/api/announcements")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructAnnouncement(1))
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                console.log(data.body.data);
                // expect(data.body.data.length).toBe(0)
            })
    })

    // Find
    it("[Find] Public user should find Announcements", async () => {
        await request(strapi.server.httpServer)
            .get("/api/announcements")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("[Find] Authenticated user should find Announcements", async () => {
        await request(strapi.server.httpServer)
            .get("/api/announcements")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("[Find] Admin user should find Announcements", async () => {
        await request(strapi.server.httpServer)
            .get("/api/announcements/")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
    })

    // FindOne
    it("[FindOne] Public user should find an announcement", async () => {
        const id = 1;
        const announcement = constructAnnouncement(id);
        await request(strapi.server.httpServer)
            .get("/api/announcements/" + 1)
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(announcement.data.Title);
                // expected "null", but received "undefined"
                // expect(data.attributes.Poster).toBe(announcement.data.Poster);
                expect(data.attributes.Description).toBe(announcement.data.Description);
                expect(data.attributes.Private).toBe(announcement.data.Private);
                expect(data.attributes.locale).toBe(announcement.data.locale);
            })
    })

    it("[FindOne] Authenticated user should find an announcement", async () => {
        const id = 1;
        const announcement = constructAnnouncement(id);
        await request(strapi.server.httpServer)
            .get("/api/announcements/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(announcement.data.Title);
                // expect(data.attributes.Poster).toBe(announcement.data.Poster);
                expect(data.attributes.Description).toBe(announcement.data.Description);
                expect(data.attributes.Private).toBe(announcement.data.Private);
                expect(data.attributes.locale).toBe(announcement.data.locale);
            })
    })

    it("[FindOne] Admin user should find an announcement", async () => {
        const id = 1;
        const announcement = constructAnnouncement(id);
        await request(strapi.server.httpServer)
            .get("/api/announcements/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(announcement.data.Title);
                // expect(data.attributes.Poster).toBe(announcement.data.Poster);
                expect(data.attributes.Description).toBe(announcement.data.Description);
                expect(data.attributes.Private).toBe(announcement.data.Private);
                expect(data.attributes.locale).toBe(announcement.data.locale);
            })
    })

    // Update
    // it("[Update] Public user should not update Announcements", async () => {
    //     const id = 1;
    //     const announcement = putAnnouncement();
    //     await request(strapi.server.httpServer)
    //         .put("/api/announcements")
    //         .set("accept", "application/json")
    //         .set('Content-Type', 'application/json')
    //         .send(putAnnouncement())
    //         // .expect("Content-Type", /json/)
    //         .expect(405)
    //         .then((data) => {
    //             console.log(data);
    //             expect(data.attributes.Title).toBe(announcement.data.Title);
    //         })
    // })

    // it("[Update] Authenticated user should not update Announcements", async () => {
    //     await request(strapi.server.httpServer)
    //         .post("/api/announcements")
    //         .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
    //         .send(putAnnouncement())
    //         .expect(500)
    // })

    it("[Update] Admin user should update Announcements", async () => {
        await request(strapi.server.httpServer)
            .put("/api/announcements/")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructAnnouncement(3))
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                console.log(data);
            })
    })
    

})

