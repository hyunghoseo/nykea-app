'use strict';

/**
 * leader controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::leader.leader');
