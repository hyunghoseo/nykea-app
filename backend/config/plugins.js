module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  "config-sync": {
    enabled: true,
    config: {
      syncDir: "config/sync/",
      minify: false,
      soft: false,
      importOnBootstrap: true,
      customTypes: [],
      excludedTypes: [],
      excludedConfig: [
        "core-store.plugin_users-permissions_grant",
        "core-store.plugin_upload_metrics",
        "core-store.strapi_content_types_schema",
        "core-store.ee_information",
      ],
    },
  },
  documentation: {
    enabled: true,
    config: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "DOCUMENTATION",
        description: "",
        termsOfService: "YOUR_TERMS_OF_SERVICE_URL",
        contact: {
          name: "TEAM",
          email: "contact-email@something.io",
          url: "www.nykea.org",
        },
        license: {
          name: "Apache 2.0",
          url: "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
      },
      "x-strapi-config": {
        // Leave empty to ignore plugins during generation
        plugins: ["upload", "users-permissions"],
        path: "/documentation",
      },
      servers: [
        {
          url: "https://admin.nykea.org/api",
          description: "Production server",
        },
      ],
      externalDocs: {
        description: "Find out more",
        url: "https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html",
      },
      security: [{ bearerAuth: [] }],
    },
  },
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET')
      },
      actionOptions: {
        upload: {},
        delete: {}
      }
    }
  }
});
