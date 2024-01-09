'use strict';

/**
 * leader router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::leader.leader');
