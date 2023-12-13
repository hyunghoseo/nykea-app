import type { Schema, Attribute } from '@strapi/strapi';

export interface AgendaDefault extends Schema.Component {
  collectionName: 'components_agenda_defaults';
  info: {
    displayName: 'Default';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    AssignedUser: Attribute.Relation<
      'agenda.default',
      'oneToOne',
      'api::user-info.user-info'
    >;
    Description: Attribute.Text;
    Image: Attribute.Media;
    URL: Attribute.String;
    Assignee: Attribute.String;
  };
}

export interface CommonDateTime extends Schema.Component {
  collectionName: 'components_common_date_times';
  info: {
    displayName: 'DateTime';
    icon: 'clock';
  };
  attributes: {
    Date: Attribute.Date & Attribute.Required;
    Time: Attribute.Time;
  };
}

export interface CommonLink extends Schema.Component {
  collectionName: 'components_common_links';
  info: {
    displayName: 'Link';
    icon: 'earth';
  };
  attributes: {
    Label: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    URL: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
  };
}

export interface ListAnnouncement extends Schema.Component {
  collectionName: 'components_list_announcements';
  info: {
    displayName: 'Announcement';
  };
  attributes: {
    Announcement: Attribute.Relation<
      'list.announcement',
      'oneToOne',
      'api::announcement.announcement'
    >;
  };
}

export interface ListDefault extends Schema.Component {
  collectionName: 'components_list_defaults';
  info: {
    displayName: 'Default';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    Description: Attribute.Text;
    Link: Attribute.Component<'common.link', true>;
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
  };
}

export interface ListEvent extends Schema.Component {
  collectionName: 'components_list_events';
  info: {
    displayName: 'Event';
    icon: 'calendar';
  };
  attributes: {
    event: Attribute.Relation<'list.event', 'oneToOne', 'api::event.event'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'agenda.default': AgendaDefault;
      'common.date-time': CommonDateTime;
      'common.link': CommonLink;
      'list.announcement': ListAnnouncement;
      'list.default': ListDefault;
      'list.event': ListEvent;
    }
  }
}
