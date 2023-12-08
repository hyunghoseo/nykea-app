'use strict';

/**
 * pamphlet service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pamphlet.pamphlet');
