import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
    Attribute.Required &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    lastname: Attribute.String &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    username: Attribute.String;
    email: Attribute.Email &
    Attribute.Required &
    Attribute.Private &
    Attribute.Unique &
    Attribute.SetMinMaxLength<{
      minLength: 6;
    }>;
    password: Attribute.Password &
    Attribute.Private &
    Attribute.SetMinMaxLength<{
      minLength: 6;
    }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
    Attribute.Private &
    Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
    Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
    Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
    Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
    Attribute.Required &
    Attribute.Unique &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    code: Attribute.String &
    Attribute.Required &
    Attribute.Unique &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
    Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
    Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
    Attribute.Required &
    Attribute.Unique &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    description: Attribute.String &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }> &
    Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
    Attribute.Required &
    Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
    Attribute.Required &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
    Attribute.Required &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
    Attribute.Required &
    Attribute.Unique &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    description: Attribute.String &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }> &
    Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
    Attribute.Required &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
    Attribute.Required &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
    Attribute.Private;
    folderPath: Attribute.String &
    Attribute.Required &
    Attribute.Private &
    Attribute.SetMinMax<{
      min: 1;
    }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
    Attribute.Required &
    Attribute.SetMinMax<{
      min: 1;
    }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
    Attribute.Required &
    Attribute.SetMinMax<{
      min: 1;
    }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
    Attribute.Required &
    Attribute.SetMinMaxLength<{
      minLength: 3;
    }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
    Attribute.Required &
    Attribute.Unique &
    Attribute.SetMinMaxLength<{
      minLength: 3;
    }>;
    email: Attribute.Email &
    Attribute.Required &
    Attribute.SetMinMaxLength<{
      minLength: 6;
    }>;
    provider: Attribute.String;
    password: Attribute.Password &
    Attribute.Private &
    Attribute.SetMinMaxLength<{
      minLength: 6;
    }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    user_info: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::user-info.user-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
    Attribute.SetMinMax<{
      min: 1;
      max: 50;
    }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
  };
}

export interface ApiAnnouncementAnnouncement extends Schema.CollectionType {
  collectionName: 'announcements';
  info: {
    singularName: 'announcement';
    pluralName: 'announcements';
    displayName: 'Announcement';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Title: Attribute.String &
    Attribute.Required &
    Attribute.Unique &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    Poster: Attribute.Media &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Description: Attribute.Text &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    HostingGroup: Attribute.Relation<
      'api::announcement.announcement',
      'oneToOne',
      'api::group.group'
    >;
    Private: Attribute.Boolean &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }> &
    Attribute.DefaultTo<false>;
    Link: Attribute.Component<'common.link', true> &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::announcement.announcement',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::announcement.announcement',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    localizations: Attribute.Relation<
      'api::announcement.announcement',
      'oneToMany',
      'api::announcement.announcement'
    >;
    locale: Attribute.String;
  };
}

export interface ApiBannerBanner extends Schema.CollectionType {
  collectionName: 'banners';
  info: {
    singularName: 'banner';
    pluralName: 'banners';
    displayName: 'Banner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Title: Attribute.String &
    Attribute.Required &
    Attribute.Unique &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    Attribute.SetMinMaxLength<{
      minLength: 5;
      maxLength: 50;
    }>;
    Description: Attribute.String &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    Attribute.SetMinMaxLength<{
      maxLength: 100;
    }>;
    Link: Attribute.Component<'common.link'> &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    StartDate: Attribute.Date &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    EndDate: Attribute.Date &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner.banner',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::banner.banner',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    localizations: Attribute.Relation<
      'api::banner.banner',
      'oneToMany',
      'api::banner.banner'
    >;
    locale: Attribute.String;
  };
}

export interface ApiChurchInfoChurchInfo extends Schema.SingleType {
  collectionName: 'church-infos';
  info: {
    singularName: 'church-info';
    pluralName: 'church-infos';
    displayName: 'ChurchInfo';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    ChurchName: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Phone: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    Email: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    Address: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    PrivatePolicy: Attribute.Text &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    FamilyWebsites: Attribute.Component<'common.link', true> &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::church-info.church-info',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::church-info.church-info',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    localizations: Attribute.Relation<
      'api::church-info.church-info',
      'oneToMany',
      'api::church-info.church-info'
    >;
    locale: Attribute.String;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Event';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Title: Attribute.String &
    Attribute.Required &
    Attribute.Unique &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    Poster: Attribute.Media &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Description: Attribute.Text &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Pictures: Attribute.Media &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    Location: Attribute.String &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Fee: Attribute.Text &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Links: Attribute.Component<'common.link', true> &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    StartDate: Attribute.Component<'common.date-time'> &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    EndDate: Attribute.Component<'common.date-time'> &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    HostingGroup: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'api::group.group'
    >;
    Private: Attribute.Boolean &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }> &
    Attribute.DefaultTo<false>;
    Contact: Attribute.String &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    localizations: Attribute.Relation<
      'api::event.event',
      'oneToMany',
      'api::event.event'
    >;
    locale: Attribute.String;
  };
}

export interface ApiGroupGroup extends Schema.CollectionType {
  collectionName: 'groups';
  info: {
    singularName: 'group';
    pluralName: 'groups';
    displayName: 'Group';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Name: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    Attribute.SetMinMaxLength<{
      minLength: 5;
    }>;
    ShortDescription: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    Attribute.SetMinMaxLength<{
      minLength: 5;
      maxLength: 50;
    }>;
    Picture: Attribute.Media &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Type: Attribute.Enumeration<
      ['Administrative', 'Community', 'Education', 'Activities']
    > &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::group.group',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::group.group',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    localizations: Attribute.Relation<
      'api::group.group',
      'oneToMany',
      'api::group.group'
    >;
    locale: Attribute.String;
  };
}

export interface ApiLeaderLeader extends Schema.CollectionType {
  collectionName: 'leaders';
  info: {
    singularName: 'leader';
    pluralName: 'leaders';
    displayName: 'Leader';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    StartYear: Attribute.Integer &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    EndYear: Attribute.Integer &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }> &
    Attribute.DefaultTo<9999>;
    FullName: Attribute.Relation<
      'api::leader.leader',
      'oneToOne',
      'api::user-info.user-info'
    >;
    Title: Attribute.Enumeration<['Pastor', 'Chairman', 'Wives', 'Sunghwa']> &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Picture: Attribute.Media &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::leader.leader',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::leader.leader',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    localizations: Attribute.Relation<
      'api::leader.leader',
      'oneToMany',
      'api::leader.leader'
    >;
    locale: Attribute.String;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Service';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Title: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Date: Attribute.Date &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    Sermon: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'api::user-info.user-info'
    >;
    MC: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'api::user-info.user-info'
    >;
    Accompanist: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'api::user-info.user-info'
    >;
    Translation: Attribute.String &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }> &
    Attribute.DefaultTo<'English FM 89.0'>;
    Agenda: Attribute.Component<'agenda.default', true> &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Announcements: Attribute.DynamicZone<
      ['list.announcement', 'list.default', 'list.event']
    > &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    SermonVideo: Attribute.String &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    ServiceType: Attribute.Enumeration<['Sunday', 'Family', 'Special']> &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }> &
    Attribute.DefaultTo<'Sunday'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    localizations: Attribute.Relation<
      'api::service.service',
      'oneToMany',
      'api::service.service'
    >;
    locale: Attribute.String;
  };
}

export interface ApiSupportSupport extends Schema.CollectionType {
  collectionName: 'supports';
  info: {
    singularName: 'support';
    pluralName: 'supports';
    displayName: 'Support';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    FullName: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    Email: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    Phone: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    Title: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    Message: Attribute.Text &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    DateSubmitted: Attribute.DateTime &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    Status: Attribute.Enumeration<['Submitted', 'Under Review', 'Completed']> &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }> &
    Attribute.DefaultTo<'Submitted'>;
    Memo: Attribute.Text &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    DateCompleted: Attribute.DateTime &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: false;
      };
    }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::support.support',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::support.support',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    localizations: Attribute.Relation<
      'api::support.support',
      'oneToMany',
      'api::support.support'
    >;
    locale: Attribute.String;
  };
}

export interface ApiUserInfoUserInfo extends Schema.CollectionType {
  collectionName: 'user_infos';
  info: {
    singularName: 'user-info';
    pluralName: 'user-infos';
    displayName: 'UserInfo';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    DisplayName: Attribute.String &
    Attribute.Required &
    Attribute.Unique &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    FirstName: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    LastName: Attribute.String &
    Attribute.Required &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    MiddleName: Attribute.String &
    Attribute.SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    users_permissions_user: Attribute.Relation<
      'api::user-info.user-info',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-info.user-info',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-info.user-info',
      'oneToOne',
      'admin::user'
    > &
    Attribute.Private;
    localizations: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::user-info.user-info'
    >;
    locale: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::announcement.announcement': ApiAnnouncementAnnouncement;
      'api::banner.banner': ApiBannerBanner;
      'api::church-info.church-info': ApiChurchInfoChurchInfo;
      'api::event.event': ApiEventEvent;
      'api::group.group': ApiGroupGroup;
      'api::leader.leader': ApiLeaderLeader;
      'api::service.service': ApiServiceService;
      'api::support.support': ApiSupportSupport;
      'api::user-info.user-info': ApiUserInfoUserInfo;
    }
  }
}
