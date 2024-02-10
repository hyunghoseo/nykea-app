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
            .post("/api/supports")
            .set("accept", "application/json")
            .send(constructSupportTicket(1))
            .expect('Content-Type',/json/)
            .expect(200)
    });

    /**
        Admin:
        [] create - done
        [x] find - done
        [x] findOne 
        [x] update 
        AuthUser:
        [x] create - done
        [] find - done
      
        Public:
        [x] create - done
        [] find - done

          **/

        it("Public user should post support ticket", async () => {
            await request(strapi.server.httpServer)
                .post("/api/supports")
                .set("accept", "application/json")
                .send(constructSupportTicket(0))
                .expect('Content-Type',/json/)
                .expect(200)
    
            await request(strapi.server.httpServer)
                .post("/api/supports")
                .set("accept", "application/json")
                .send(constructSupportTicket(1))
                .expect("Content-Type", /json/)
                .expect(200)
        });

        it("Authenticated user should post support ticket", async () => {
            await request(strapi.server.httpServer)
                .post("/api/supports")
                .set("accept", "application/json")
                .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
                .send(constructSupportTicket(2))
                .expect("Content-Type", /json/)
                .expect(200)
        })

        it("Admin user should not post support ticket", async () => {
            await request(strapi.server.httpServer)
                .post("/api/supports")
                .set("accept", "application/json")
                .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
                .send(constructSupportTicket(3))
                .expect("Content-Type", /json/)
                .expect(500)
        })

        it("Public user should not find support tickets", async () => {
            await request(strapi.server.httpServer)
                .get("/api/supports")
                .set("accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(500)
        })

        it("Authenticated user should not find support tickets", async () => {
            await request(strapi.server.httpServer)
                .get("/api/supports")
                .set("accept", "application/json")
                .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
                .expect("Content-Type", /json/)
                .expect(500)
        })

        it("Admin user should find support tickets", async () => {
            await request(strapi.server.httpServer)
                .get("/api/supports")
                .set("accept", "application/json")
                .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .then((data) => {
                    expect(data.body.data.length).toBe(4);
                });
        });

        it("Admin user should find a support ticket", async () => {
            const id = 3
            const support = constructSupportTicket(id);
            await request(strapi.server.httpServer)
                .get("/api/supports/" + id)
                .set("accept", "application/json")
                .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
                .expect("Content-Type", /json/)
                .expect(200)
                .then((data) => {
                    data = data.body.data;
                    expect(data.attributes.FullName).toBe(support.data.FullName); //expected name3 received name1 why??
                    expect(data.attributes.Email).toBe(support.data.Email);
                    expect(data.attributes.Phone).toBe(support.data.Phone);
                    expect(data.attributes.Title).toBe(support.data.Title);
                    expect(data.attributes.Message).toBe(support.data.Message);
                    expect(data.attributes.Status).toBe(support.data.Status);
                    expect(data.attributes.Memo).toBe(support.data.Memo);
                    expect(data.attributes.locale).toBe(support.data.locale);
                })
        });

        it("Admin user should update a support ticket", async () => {
            const id = 4; 
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