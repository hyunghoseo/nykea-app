const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");
const constructor = require("../../helpers/constructor");

describe("Banner Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    it("[Create] Public user should not post banner", async () => {
        await request(strapi.server.httpServer)
            .post("/api/banners")
            .set("accept", "application/json")
            .send(constructor.constructBanner(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Authenticated user should not post banner", async () => {
        await request(strapi.server.httpServer)
            .post("/api/banners")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructor.constructBanner(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Admin user should post banners", async () => {
        await request(strapi.server.httpServer)
            .post("/api/banners")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructBanner(1))
            .expect("Content-Type", /json/)
            .expect(200)

        await request(strapi.server.httpServer)
            .post("/api/banners")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructBanner(2))
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("[Find] Public user should find banners", async () => {
        await request(strapi.server.httpServer)
            .get("/api/banners?populate=*&locale=en")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("[Find] Authenticated user should find banners", async () => {
        await request(strapi.server.httpServer)
            .get("/api/banners?populate=*&locale=en")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("[Find] Admin user should find banners", async () => {
        await request(strapi.server.httpServer)
            .get("/api/banners?populate=*&locale=en")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(2);
            });
    });

    it("[FindOne] Public user should find a banner", async () => {
        const id = 1;
        const banner = constructor.constructBanner(id);
        await request(strapi.server.httpServer)
            .get(`/api/banners/${id}?populate=*`)
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(banner.data.Title);
                expect(data.attributes.Description).toBe(banner.data.Description);
                expect(data.attributes.StartDate).toBe(banner.data.StartDate);
                expect(data.attributes.EndDate).toBe(banner.data.EndDate);
                expect(data.attributes.Link.Label).toBe(banner.data.Link.Label);
                expect(data.attributes.Link.URL).toBe(banner.data.Link.URL);
                expect(data.attributes.locale).toBe(banner.data.locale);
            })
    });

    it("[FindOne] Authenticated user should find a banner", async () => {
        const id = 1;
        const banner = constructor.constructBanner(id);
        await request(strapi.server.httpServer)
            .get(`/api/banners/${id}?populate=*`)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(banner.data.Title);
                expect(data.attributes.Description).toBe(banner.data.Description);
                expect(data.attributes.StartDate).toBe(banner.data.StartDate);
                expect(data.attributes.EndDate).toBe(banner.data.EndDate);
                expect(data.attributes.Link.Label).toBe(banner.data.Link.Label);
                expect(data.attributes.Link.URL).toBe(banner.data.Link.URL);
                expect(data.attributes.locale).toBe(banner.data.locale);
            })
    });

    it("[FindOne] Admin user should find a banner", async () => {
        const id = 1;
        const banner = constructor.constructBanner(id);
        await request(strapi.server.httpServer)
            .get(`/api/banners/${id}?populate=*`)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(banner.data.Title);
                expect(data.attributes.Description).toBe(banner.data.Description);
                expect(data.attributes.StartDate).toBe(banner.data.StartDate);
                expect(data.attributes.EndDate).toBe(banner.data.EndDate);
                expect(data.attributes.Link.Label).toBe(banner.data.Link.Label);
                expect(data.attributes.Link.URL).toBe(banner.data.Link.URL);
                expect(data.attributes.locale).toBe(banner.data.locale);
            })
    });
})