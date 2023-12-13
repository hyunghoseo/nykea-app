'use strict';

/**
 * announcement service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::announcement.announcement');
