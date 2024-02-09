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
                "Title": "Test Announcement " + id,
                "Poster": null,
                "Description": "Announcement Description " + id,
                "HostingGroup": "Announcement HostingGroup" + id,
                "Private": false,
                "locale": "en",
                "publishedAt": Date.now(),
            }
        };
    }

    // Get
    it("[Announcement] Get All Announcements", async () => {
        await request(strapi.server.httpServer)
            .get("/api/announcements")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            
    })

    // Post
    it("[Announcement] Public user should not post group", async () => {
        await request(strapi.server.httpServer)
            .post("/api/announcements")
            .set("accept", "application/json")
            .send(constructAnnouncement(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    

})

