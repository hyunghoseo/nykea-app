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
                "Poster": null,
                "Picture": null,
                "Description": "Event Description " + id,
                "Location": "Event Location " + id,
                "Fee": "Event Fee " + id, 
                "Contact": "Event Contact " + id,
                "Private": false,
                "locale": "en",
                "publishedAt": Date.now(),
            }
        };
    }

    
})
