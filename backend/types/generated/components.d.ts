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
        minLength: 1;
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
    > &
      Attribute.Required;
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
    icon: 'pinMap';
    description: '';
  };
  attributes: {
    Label: Attribute.String & Attribute.Required;
    AddressURL: Attribute.String;
    Address: Attribute.String & Attribute.Required;
    AddressDetail: Attribute.String;
    City: Attribute.String & Attribute.Required;
    State: Attribute.Enumeration<
      [
        'N/A',
        'AL, Alabama',
        'AK, Alaska',
        'AZ, Arizona',
        'AR, Arkansas',
        'CA, California',
        'CO, Colorado',
        'CT, Connecticut',
        'DE, Delaware',
        'FL, Florida',
        'GA, Georgia',
        'HI, Hawaii',
        'ID, Idaho',
        'IL, Illinois',
        'IN, Indiana',
        'IA, Iowa',
        'KS, Kansas',
        'KY, Kentucky',
        'LA, Louisiana',
        'ME, Maine',
        'MD, Maryland',
        'MA, Massachusetts',
        'MI, Michigan',
        'MN, Minnesota',
        'MS, Mississippi',
        'MO, Missouri',
        'MT, Montana',
        'NE, Nebraska',
        'NV, Nevada',
        'NH, New Hampshire',
        'NJ, New Jersey',
        'NM, New Mexico',
        'NY, New York',
        'NC, North Carolina',
        'ND, North Dakota',
        'OH, Ohio',
        'OK, Oklahoma',
        'OR, Oregon',
        'PA, Pennsylvania',
        'RI, Rhode Island',
        'SC, South Carolina',
        'SD, South Dakota',
        'TN, Tennessee',
        'TX, Texas',
        'UT, Utah',
        'VT, Vermont',
        'VA, Virginia',
        'WA, Washington',
        'WV, West Virginia',
        'WI, Wisconsin',
        'WY, Wyoming'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'NJ, New Jersey'>;
    Country: Attribute.Enumeration<['USA', 'Rep. of Korea', 'Japan']> &
      Attribute.Required &
      Attribute.DefaultTo<'USA'>;
  };
}

export interface CommonDateTime extends Schema.Component {
  collectionName: 'components_common_date_times';
  info: {
    displayName: 'DateTime';
    icon: 'clock';
    description: '';
  };
  attributes: {
    Date: Attribute.Date & Attribute.Required;
    Time: Attribute.Time & Attribute.DefaultTo<'12:00'>;
    TimeZone: Attribute.Enumeration<
      [
        'Atlanta, GA, USA (GMT-4)',
        'Auckland, New Zealand (GMT+12)',
        'Austin, TX, USA (GMT-5)',
        'Beijing, China (GMT+8)',
        'Berlin, Germany (GMT+2)',
        'Boston, MA, USA (GMT-4)',
        'Brussels, Belgium (GMT+2)',
        'Chicago, IL, USA (GMT-5)',
        'Dallas, TX, USA (GMT-5)',
        'Houston, TX, USA (GMT-5)',
        'Istanbul, Turkey (GMT+3)',
        'Las Vegas, NV, USA (GMT-7)',
        'London, England, UK (GMT+1)',
        'Los Angeles, CA, USA (GMT-7)',
        'Madrid, Spain (GMT+2)',
        'Melbourne, Australia (GMT+10)',
        'Miami, FL, USA (GMT-4)',
        'Minneapolis, MN, USA (GMT-5)',
        'Mexico City, Mexico (GMT-5)',
        'Moscow, Russia (GMT+3)',
        'Nashville, TN, USA (GMT-5)',
        'New York, NY, USA (GMT-4)',
        'Orlando, FL, USA (GMT-4)',
        'Paris, France (GMT+2)',
        'Phoenix, AZ, USA (GMT-7)',
        'Portland, OR, USA (GMT-7)',
        'Rome, Italy (GMT+2)',
        'San Diego, CA, USA (GMT-7)',
        'San Francisco, CA, USA (GMT-7)',
        'Seattle, WA, USA (GMT-7)',
        'Seoul, South Korea (GMT+9)',
        'Sydney, Australia (GMT+10)',
        'Tokyo, Japan (GMT+9)',
        'Toronto, ON, Canada (GMT-4)',
        'Vancouver, BC, Canada (GMT-7)',
        'Vienna, Austria (GMT+2)',
        'Washington, D.C., USA (GMT-4)',
        'Zurich, Switzerland (GMT+2)'
      ]
    > &
      Attribute.DefaultTo<'New York, NY, USA (GMT-4)'>;
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
