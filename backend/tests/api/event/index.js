const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");
const constructor = require("../../helpers/constructor");

describe("Event Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    // Create
    it("[Create] Public user should not post Events", async () => {
        await request(strapi.server.httpServer)
            .post("/api/events")
            .set("accept", "application/json")
            .send(constructor.constructEvent(1))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Authenticated user should not post Events", async () => {
        await request(strapi.server.httpServer)
            .post("/api/events")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructor.constructEvent(1))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Admin user should post Events", async () => {
        const event = constructor.constructEvent(1);
        console.log(event);
        await request(strapi.server.httpServer)
            .post("/api/events?populate=*")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructEvent(1))
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((data) => {
                console.log(data.body);
                data = data.body.data;
                console.log(event.data.StartDate);
                console.log(data.attributes.StartDate);
                expect(data.attributes.Title).toBe(event.data.Title);
                expect(data.attributes.Fee).toBe(event.data.Fee);
                expect(data.attributes.Description).toEqual(event.data.Description);
                expect(data.attributes.Location).toStrictEqual(event.data.Location);
                expect(data.attributes.StartDate).toStrictEqual(event.data.StartDate);
                expect(data.attributes.Contact).toBe(event.data.Contact);
                expect(data.attributes.Private).toBe(event.data.Private);
                expect(data.attributes.locale).toBe(event.data.locale);
            })
    })

    // Find
    it("[Find] Public user should find Events", async () => {
        await request(strapi.server.httpServer)
            .get("/api/events?locale=en")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(1);
            })
    })

    it("[Find] Authenticated user should find Events", async () => {
        await request(strapi.server.httpServer)
            .get("/api/events?locale=en")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(1);
            })
    })

    it("[Find] Admin user should find Events", async () => {
        await request(strapi.server.httpServer)
            .get("/api/events?locale=en")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(1);
            })
    })

    // FindOne
    it("[FindOne] Public user should find an event", async () => {
        const id = 1;
        const event = constructor.constructEvent(id);
        await request(strapi.server.httpServer)
            .get("/api/events/" + id)
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(event.data.Title);
                expect(data.attributes.Fee).toBe(event.data.Fee);
                expect(data.attributes.Contact).toBe(event.data.Contact);
                expect(data.attributes.Private).toBe(event.data.Private);
                expect(data.attributes.locale).toBe(event.data.locale);
            })
    })

    it("[FindOne] Authenticated user should find an event", async () => {
        const id = 1;
        const event = constructor.constructEvent(id);
        await request(strapi.server.httpServer)
            .get("/api/events/" + id)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(event.data.Title);
                expect(data.attributes.Fee).toBe(event.data.Fee);
                expect(data.attributes.Contact).toBe(event.data.Contact);
                expect(data.attributes.Private).toBe(event.data.Private);
                expect(data.attributes.locale).toBe(event.data.locale);
            })
    })

    it("[FindOne] Admin user should find an event", async () => {
        const id = 1;
        const event = constructor.constructEvent(id);
        await request(strapi.server.httpServer)
            .get("/api/events/" + id)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(event.data.Title);
                expect(data.attributes.Fee).toBe(event.data.Fee);
                expect(data.attributes.Contact).toBe(event.data.Contact);
                expect(data.attributes.Private).toBe(event.data.Private);
                expect(data.attributes.locale).toBe(event.data.locale);
            })
    })

    // Update
    it("[Update] Public user should not update Events", async () => {
        const id = 1;
        await request(strapi.server.httpServer)
            .put("/api/events/" + id)
            .set("accept", "application/json")
            .set('Content-Type', 'application/json')
            .send(constructor.constructEvent(3))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Update] Authenticated user should not update Events", async () => {
        const id = 1;
        await request(strapi.server.httpServer)
            .put("/api/events/" + id)
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .set('Content-Type', 'application/json')
            .send(constructor.constructEvent(3))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Update] Admin user should update Events", async () => {
        const id = 1;
        const event = constructor.constructEvent(3);
        await request(strapi.server.httpServer)
            .put("/api/events/" + id)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructEvent(3))
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(event.data.Title);
                expect(data.attributes.Fee).toBe(event.data.Fee);
                expect(data.attributes.Contact).toBe(event.data.Contact);
                expect(data.attributes.Private).toBe(event.data.Private);
                expect(data.attributes.locale).toBe(event.data.locale);
            })
    })
})
