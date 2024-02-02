'use strict';

/**
 * user-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-info.user-info');
