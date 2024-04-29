const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");
const constructor = require("../../helpers/constructor");

describe("Support Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        authenticatedUser = await userFactory.createUser(strapi, "authenticated");
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    it("[Create] Public user should post support ticket", async () => {
        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .send(constructor.constructSupportTicket(1))        //id1
            .expect('Content-Type',/json/)
            .expect(200)

        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .send(constructor.constructSupportTicket(2))        //id2
            .expect("Content-Type", /json/)
            .expect(200)
    });

    it("[Create] Authenticated user should post support ticket", async () => {
        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructor.constructSupportTicket(3))        //id3
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("[Create] Admin user should not post support ticket", async () => {
        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructor.constructSupportTicket(4))    
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Find] Public user should not find support tickets", async () => {
        await request(strapi.server.httpServer)
            .get("/api/supports")
            .set("accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Find] Authenticated user should not find support tickets", async () => {
        await request(strapi.server.httpServer)
            .get("/api/supports")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(500)
    })

    it("[Find] Admin user should find support tickets", async () => {
        await request(strapi.server.httpServer)
            .get("/api/supports")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.data.length).toBe(3);
            });
    });

    it("[FindOne] Admin user should find a support ticket", async () => {
        const id = 2
        const support = constructor.constructSupportTicket(id);
        await request(strapi.server.httpServer)
            .get("/api/supports/" + id)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.FullName).toBe(support.data.FullName); 
                expect(data.attributes.Email).toBe(support.data.Email);
                expect(data.attributes.Phone).toBe(support.data.Phone);
                expect(data.attributes.Title).toBe(support.data.Title);
                expect(data.attributes.Message).toBe(support.data.Message);
                expect(data.attributes.Status).toBe(support.data.Status);
                expect(data.attributes.Memo).toBe(support.data.Memo);
            })
    });

    it("[Update] Admin user should update a support ticket", async () => {
        const id = 3; 
        const updatedStatus = "Completed";
        const updatedMemo = "Ticket Completed";
        await request(strapi.server.httpServer)
            .put("/api/supports/" + id)
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send({
                "data": {
                    "Status": updatedStatus,
                    "Memo": updatedMemo
                }
            })
            .expect("Content-Type", /json/)
            .expect(200)
            .then((data) => {
                data = data.body.data;
                expect(data.attributes.Status).toBe(updatedStatus);
                expect(data.attributes.Memo).toBe(updatedMemo);
            });
    });
})
