/**
 * Default data that factory use
 */
const defaultData = {
    username: `tester`,
    email: `tester@strapi.com`,
    provider: "local",
    password: "1234abc",
    confirmed: true,
    blocked: null,
};

/**
 * Returns random username object for user creation
 * @param {object} options that overwrites default options
 * @returns {object} object that is used with `strapi.plugins["users-permissions"].services.user.add`
 */
const mockUserData = (options = {}) => {
    const usernameSuffix = Math.round(Math.random() * 10000).toString();
    return {
        ...defaultData,
        username: `tester${usernameSuffix}`,
        email: `tester${usernameSuffix}@strapi.com`,
        ...options,
    };
};
/**
 * Creates new user in strapi database
 * @param strapi, instance of strapi
 * @param role that overwrites default options "authenticated", "admin"
 * @param data that overwrites default user mock data
 * @returns {object} object of new created user, fetched from database
 */
const createUser = async (strapi, role, data = null) => {
    /** Gets the default user role */
    const defaultRole = await strapi
        .db.query("plugin::users-permissions.role")
        .findOne({
            where: {
                type: role
            }
        }, []);
    /** Creates a new user an push to database */
    return await strapi.plugins["users-permissions"].services.user.add({
        ...(data || mockUserData()),
        role: defaultRole ? defaultRole.id : null,
    });
};

module.exports = {
    mockUserData,
    createUser
};