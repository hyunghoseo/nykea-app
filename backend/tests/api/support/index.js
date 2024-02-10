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
<<<<<<< HEAD
<<<<<<< HEAD
    const constructSupportTicket = (id) => {
=======
    const constructGroup = (id) => {
>>>>>>> afbec58 (created test index.js for support)
=======
    const constructSupportTicket = (id) => {
>>>>>>> 287759c (KEA-147 turned off localization (testing impact on Strapi response content type))
        return {
            data: {
                "FullName": "Test Name" + id,
                "Email": "test" + id + "@email.com",
                "Phone": "111-111-1111",
                "Title": "Test Title" + id,
                "Message": "Test Message" + id,
                "DateSubmitted": Date.now(),
<<<<<<< HEAD
<<<<<<< HEAD
                "Status": "Submitted", // "Under Review" or "Completed"
                "Memo": null,
                "DateCompleted": null,
=======
                "Status": "Submitted", //"Under Review" or "Completed"
=======
                "Status": "Submitted", // "Under Review" or "Completed"
>>>>>>> 287759c (KEA-147 turned off localization (testing impact on Strapi response content type))
                "Memo": "Test Memo" + id,
                "DateCompleted": Date.now(),
>>>>>>> afbec58 (created test index.js for support)
                "locale": "en"
            }
        };
    }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
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

>>>>>>> fc33d26 (KEA-147 cleaned up tests)
    it("Public user should post support ticket", async () => {
        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
<<<<<<< HEAD
            .send(constructSupportTicket(1))       
            .expect('Content-Type',/json/)
            .expect(200)

        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .send(constructSupportTicket(2))        
            .expect("Content-Type", /json/)
            .expect(200)
    });

    it("Authenticated user should post support ticket", async () => {
        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructSupportTicket(3))        
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("Admin user should not post support ticket", async () => {
        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructSupportTicket(4))    
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
                expect(data.body.data.length).toBe(3);
            });
    });

    it("Admin user should find a support ticket", async () => {
        const id = 2
        const support = constructSupportTicket(id);
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
                expect(data.attributes.locale).toBe(support.data.locale);
            })
    });

    it("Admin user should update a support ticket", async () => {
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
        
=======

    


    // it("Public user should not post group", async () => {
    //     await request(strapi.server.httpServer)
    //         .post("/api/groups")
    //         .set("accept", "application/json")
    //         .send(constructGroup(0))
    //         .expect("Content-Type", /json/)
    //         .expect(500)
    // })
=======
    it("Public user should post support ticket", async () => {
        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .send(constructSupportTicket(1))
            .then(response => {
                const contentType = response.headers['content-type'];
                console.log('Content-Type:', contentType);
            });
    });
>>>>>>> 287759c (KEA-147 turned off localization (testing impact on Strapi response content type))

    // it("Authenticated user should not post group", async () => {
    //     await request(strapi.server.httpServer)
    //         .post("/api/groups")
    //         .set("accept", "application/json")
    //         .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
    //         .send(constructGroup(0))
    //         .expect("Content-Type", /json/)
    //         .expect(500)
    // })
=======
            .send(constructSupportTicket(1))        //id1
            .expect('Content-Type',/json/)
            .expect(200)
>>>>>>> fc33d26 (KEA-147 cleaned up tests)

        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .send(constructSupportTicket(2))        //id2
            .expect("Content-Type", /json/)
            .expect(200)
    });

    it("Authenticated user should post support ticket", async () => {
        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .send(constructSupportTicket(3))        //id3
            .expect("Content-Type", /json/)
            .expect(200)
    })

    it("Admin user should not post support ticket", async () => {
        await request(strapi.server.httpServer)
            .post("/api/supports")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
            .send(constructSupportTicket(4))    
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
                expect(data.body.data.length).toBe(3);
            });
    });

<<<<<<< HEAD
    // it("Admin user should find a group", async () => {
    //     const id = 1;
    //     const group = constructGroup(id);
    //     await request(strapi.server.httpServer)
    //         .get("/api/groups/" + 1)
    //         .set("accept", "application/json")
    //         .set("Authorization", `Bearer ${await jwt(adminUser.id)}`)
    //         .expect("Content-Type", /json/)
    //         .expect(200)
    //         .then((data) => {
    //             data = data.body.data;
    //             expect(data.attributes.Name).toBe(group.data.Name);
    //             expect(data.attributes.ShortDescription).toBe(group.data.ShortDescription);
    //             expect(data.attributes.locale).toBe(group.data.locale);
    //         })
    // });
>>>>>>> afbec58 (created test index.js for support)
=======
    it("Admin user should find a support ticket", async () => {
        const id = 2
        const support = constructSupportTicket(id);
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
                expect(data.attributes.locale).toBe(support.data.locale);
            })
    });

    it("Admin user should update a support ticket", async () => {
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
        
>>>>>>> fc33d26 (KEA-147 cleaned up tests)
})