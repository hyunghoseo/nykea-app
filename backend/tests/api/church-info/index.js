// create church-info index file

const request = require('supertest');
const { jwt } = require("../../helpers/strapi");
const userFactory = require("../../user/factory");

describe("Church Info Test", () => {
    let authenticatedUser;
    let adminUser;
    beforeAll(async () => {
        console.log("Church Info before all");
        authenticatedUser = await userFactory.createUser(strapi, 'authenticated');
        adminUser = await userFactory.createUser(strapi, "admin");
    });

    /**
     * @param {string | number} id
     */

    const constructChurchInfo = (id) => {
        return {
            data: {
                "ChurchName": "Test Name " + id,
                "Phone": "000-000-0000",
                "Email": "test" + id + "@test.com",
                "Address": id + "north haledon",
                "PrivatePolicy": "policy" + id,
                "locale": "en",
                "publishedAt": Date.now(),
            }
        };
    }


})