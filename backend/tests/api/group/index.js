const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");
describe("Group Test", () => {

    let publicUser;
    let authenticatedUser;
    beforeAll(async () => {
        publicUser = await userFactory.createUser(strapi, 2);
        authenticatedUser = await userFactory.createUser(strapi, 1);
        addTestData();
    });

    const addTestData = async () => {
        strapi.db.query('api::group.group').create({
            data: {
                "Name": "Test Group " + Date.now(),
                "ShortDescription": "Group Description",
                "Picture": null,
                "locale": "en",
                "publishedAt": Date.now(),
            }
        });
    }

    // it("should post group", async () => {
    //     // console.log(getMockImageUrl())
    //     await request(strapi.server.httpServer)
    //         .post("/api/groups")
    //         .set("accept", "application/json")
    //         .set("Authorization", `Bearer ${await jwt(publicUser.id)}`)
    //         .send({
    //             "data": {
    //                 "Name": "string",
    //                 "ShortDescription": "string",
    //                 "Picture": getMockImageUrl(),
    //                 "locale": "string"
    //             }
    //         })
    //         .expect("Content-Type", /json/)
    //         .expect(200)
    // })

    it("Public user should find groups", async () => {
        console.log("public user jwt")
        console.log(await jwt(publicUser.id))
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(publicUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200) // Expect response http code 200
            .then((data) => {
                console.log(data.body)
            });
    });

    it("Authenticated user should find groups", async () => {
        await request(strapi.server.httpServer)
            .get("/api/groups")
            .set("accept", "application/json")
            .set("Authorization", `Bearer ${await jwt(authenticatedUser.id)}`)
            .expect("Content-Type", /json/)
            .expect(200) // Expect response http code 200
            .then((data) => {
            });
    });
})