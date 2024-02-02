'use strict';

/**
 * leader service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::leader.leader');
