'use strict';

/**
 * private-policy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::private-policy.private-policy');
