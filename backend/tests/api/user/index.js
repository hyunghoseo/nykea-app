const request = require('supertest');
const userFactory = require("../../user/factory");

it("should login user and return jwt token", async () => {
    let mockUser = userFactory.mockUserData();
    /** Creates a new user and save it to the database */
    await strapi.plugins["users-permissions"].services.user.add(mockUser);

    await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
        .post("/api/auth/local")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .send({
            identifier: mockUser.email,
            password: mockUser.password,
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .then((data) => {
            expect(data.body.jwt).toBeDefined();
        });
});

it('should return users data for authenticated user', async () => {
    let mockUser = await userFactory.mockUserData();
    /** Gets the default user role */
    const defaultRole = await strapi.query('plugin::users-permissions.role').findOne({}, []);

    const role = defaultRole ? defaultRole.id : null;

    /** Creates a new user and push to database */
    const user = await strapi.plugins['users-permissions'].services.user.add({
        ...mockUser,
        role,
    });

    const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
    });

    await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
        .get('/api/users/me')
        .set('accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + jwt)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(data => {
            expect(data.body).toBeDefined();
            expect(data.body.id).toBe(user.id);
            expect(data.body.username).toBe(user.username);
            expect(data.body.email).toBe(user.email);
        });
});