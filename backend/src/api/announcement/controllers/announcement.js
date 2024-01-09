'use strict';

/**
 * announcement controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::announcement.announcement');
