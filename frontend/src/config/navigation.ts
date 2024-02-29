import { LinkingOptions } from "@react-navigation/native";

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
  ContactUs: undefined;
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
      ContactUs: "contact-us",
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
  "ContactUs",
] as const;
