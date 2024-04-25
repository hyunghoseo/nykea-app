import { LinkingOptions } from "@react-navigation/native";
import { UndefinedInitialDataInfiniteOptions } from "@tanstack/react-query";

/*
 * Examples with query params:
 *  Profile: { userId: string };
 *  Feed: { sort: 'latest' | 'top' } | undefined;
 */
export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Groups: undefined;
  Services: undefined;
  Events: undefined;
  Announcements: undefined;
  ContactUs: undefined;
  AnnouncementDetail: undefined;
};

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["nykea.org", "nykea://"],
  config: {
    initialRouteName: "Home",
    screens: {
      Home: "",
      About: "about",
      Groups: "groups",
      Services: "services",
      Events: "events",
      Announcements: "announcements",
      ContactUs: "contact-us",
      AnnouncementDetail: "announcements/:id",
      // (query param example) Profile: "profile/:userId"
    },
  },
};

// Routes that appear in the navigation menus
export const navRoutes = [
  "About",
  "Groups",
  "Services",
  "Events",
  "Announcements",
  "ContactUs",
] as const;
