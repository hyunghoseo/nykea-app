module.exports = ({ env }) => ({
    'users-permissions': {
        config: {
            jwtSecret: env('JWT_SECRET'),
        },
    },
    'config-sync': {
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
});