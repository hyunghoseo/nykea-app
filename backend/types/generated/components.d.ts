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
    Link: Attribute.Component<'common.link'>;
    AgendaType: Attribute.Enumeration<
      [
        'Kiwon',
        'Opening Song',
        'Family Pledge',
        'Opening Prayer',
        'Monthly Video',
        'Sermon'
      ]
    >;
    AssignedGroup: Attribute.Relation<
      'agenda.default',
      'oneToOne',
      'api::group.group'
    >;
    Video: Attribute.String;
    Standing: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface CommonAddress extends Schema.Component {
  collectionName: 'components_common_addresses';
  info: {
    displayName: 'Address';
    icon: 'book';
    description: '';
  };
  attributes: {
    Address: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    AddressDetail: Attribute.String;
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
    description: '';
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
        minLength: 5;
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
      'common.address': CommonAddress;
      'common.date-time': CommonDateTime;
      'common.link': CommonLink;
      'list.announcement': ListAnnouncement;
      'list.default': ListDefault;
      'list.event': ListEvent;
    }
  }
}
