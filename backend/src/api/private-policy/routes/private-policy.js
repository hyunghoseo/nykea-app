'use strict';

/**
 * private-policy router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::private-policy.private-policy');
