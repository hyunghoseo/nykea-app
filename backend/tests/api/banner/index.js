const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");

describe("banner Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    /**
     * @param {string | number} id
     */
    const constructBanner = (id) => {
        return {
            data: {
                "Title": "Banner Title " + id,
                "Description": "Banner Description " + id,
                "Link": {
                    "id": 1,
                    "Label": "NY KEA",
                    "URL": "www.nykea.org"
                },
                "StartDate": "2024-01-26",
                "EndDate": "2024-02-26",
                "locale": "en"
            }
        };
    }

    it("Public user should not post banner", async () => {
        await request(strapi.server.httpServer)
            .post("/api/banners")
            .set("accept", "application/json")
            .send(constructBanner(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("Authenticated user should not post banner", async () => {
        await request(strapi.server.httpServer)
            .post("/api/banners")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructBanner(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("Admin user should post banners", async () => {
        await request(strapi.server.httpServer)
            .post("/api/banners")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructBanner(1))
            .expect("Content-Type", /json/)
            .expect(200)

        await request(strapi.server.httpServer)
            .post("/api/banners")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructBanner(2))
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("Public user should find banners", async () => {
        await request(strapi.server.httpServer)
            .get("/api/banners")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("Authenticated user should find banners", async () => {
        await request(strapi.server.httpServer)
            .get("/api/banners")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("Admin user should find banners", async () => {
        await request(strapi.server.httpServer)
            .get("/api/banners")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("Public user should find a banner", async () => {
        const id = 1;
        const banner = constructBanner(id);
        await request(strapi.server.httpServer)
            .get("/api/banners/" + 1)
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(banner.data.Title);
                expect(data.attributes.Description).toBe(banner.data.Description);
                expect(data.attributes.locale).toBe(banner.data.locale);
            })
    });

    it("Authenticated user should find a banner", async () => {
        const id = 1;
        const banner = constructBanner(id);
        await request(strapi.server.httpServer)
            .get("/api/banners/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Name).toBe(banner.data.Name);
                expect(data.attributes.ShortDescription).toBe(banner.data.ShortDescription);
                expect(data.attributes.locale).toBe(banner.data.locale);
            })
    });

    it("Admin user should find a banner", async () => {
        const id = 1;
        const banner = constructBanner(id);
        await request(strapi.server.httpServer)
            .get("/api/banners/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Name).toBe(banner.data.Name);
                expect(data.attributes.ShortDescription).toBe(banner.data.ShortDescription);
                expect(data.attributes.locale).toBe(banner.data.locale);
            })
    });
})