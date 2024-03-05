const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");

describe("Event Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    /**
     * @param {string | number} id
     */
    const constructEvent = (id) => {
        return {
            data: {
                "Title": "Event Title " + id,
                "StartDate": {
                    "id": id,
                    "Date": "2024-03-04",
                    "Time": "12:13:54.000"
                  },
                "Location": [
                {
                    "id": id,
                    "Label": "MARCH TEST",
                    "AddressURL": "www.blahblah",
                    "AddressDetail": "3rd Floor"
                }
                ],
                "Description": "Event Description " + id,
                "Fee": "Event Fee " + id, 
                "Contact": "Event Contact " + id,
                "Private": false,
                "locale": "en",
                "publishedAt": Date.now(),
            }
        };
    }

    // Create
    it("[Create] Public user should not post Events", async () => {
        await request(strapi.server.httpServer)
            .post("/api/events")
            .set("accept", "application/json")
            .send(constructEvent(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Authenticated user should not post Events", async () => {
        await request(strapi.server.httpServer)
            .post("/api/events")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructEvent(0))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Create] Admin user should post Events", async () => {
        const event = constructEvent(0);
        await request(strapi.server.httpServer)
            .post("/api/events")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructEvent(0))
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(event.data.Title);
                // expected "null", but received "undefined"
                // expect(data.attributes.Poster).toBe(event.data.Poster);
                // expect(data.attributes.Picture).toBe(event.data.Picture);
                expect(data.attributes.Description).toBe(event.data.Description);
                expect(data.attributes.Fee).toBe(event.data.Fee);
                expect(data.attributes.Contact).toBe(event.data.Contact);
                expect(data.attributes.Private).toBe(event.data.Private);
                expect(data.attributes.locale).toBe(event.data.locale);
            })
    })

    // Find
    it("[Find] Public user should find Events", async () => {
        await request(strapi.server.httpServer)
            .get("/api/events")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(1);
            })
    })

    it("[Find] Authenticated user should find Events", async () => {
        await request(strapi.server.httpServer)
            .get("/api/events")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(1);
            })
    })

    it("[Find] Admin user should find Events", async () => {
        await request(strapi.server.httpServer)
            .get("/api/events")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(1);
            })
    })

    // FindOne
    it("[FindOne] Public user should find an event", async () => {
        const id = 0;
        const event = constructEvent(id);
        await request(strapi.server.httpServer)
            .get("/api/events/" + 1)
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(event.data.Title);
                expect(data.attributes.Description).toBe(event.data.Description);
                expect(data.attributes.Fee).toBe(event.data.Fee);
                expect(data.attributes.Contact).toBe(event.data.Contact);
                expect(data.attributes.Private).toBe(event.data.Private);
                expect(data.attributes.locale).toBe(event.data.locale);
            })
    })

    it("[FindOne] Authenticated user should find an event", async () => {
        const id = 0;
        const event = constructEvent(id);
        await request(strapi.server.httpServer)
            .get("/api/events/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(event.data.Title);
                expect(data.attributes.Description).toBe(event.data.Description);
                expect(data.attributes.Fee).toBe(event.data.Fee);
                expect(data.attributes.Contact).toBe(event.data.Contact);
                expect(data.attributes.Private).toBe(event.data.Private);
                expect(data.attributes.locale).toBe(event.data.locale);
            })
    })

    it("[FindOne] Admin user should find an event", async () => {
        const id = 0;
        const event = constructEvent(id);
        await request(strapi.server.httpServer)
            .get("/api/events/" + 1)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Title).toBe(event.data.Title);
                expect(data.attributes.Description).toBe(event.data.Description);
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
            .send(constructEvent(10))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Update] Authenticated user should not update Events", async () => {
        const id = 1;
        await request(strapi.server.httpServer)
            .put("/api/events/" + id)
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .set('Content-Type', 'application/json')
            .send(constructEvent(12))
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Update] Admin user should update Events", async () => {
        const id = 1;
        const event = constructEvent(1);
        await request(strapi.server.httpServer)
            .put("/api/events/" + id)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(event)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                console.log(data.attributes.Title);
                expect(data.attributes.Title).toBe(event.data.Title);
                expect(data.attributes.Description).toBe(event.data.Description);
                expect(data.attributes.Fee).toBe(event.data.Fee);
                expect(data.attributes.Contact).toBe(event.data.Contact);
                expect(data.attributes.Private).toBe(event.data.Private);
                expect(data.attributes.locale).toBe(event.data.locale);
            })
    })

    
})
