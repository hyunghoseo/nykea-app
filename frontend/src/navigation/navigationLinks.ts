import { LinkingOptions, ParamListBase } from "@react-navigation/native";

export interface NavLink {
  title: string;
  route: string;
}

export const navigationLinks = [
  { title: "About", route: "About" },
  { title: "Groups", route: "Groups" },
  { title: "Services", route: "Services" },
  { title: "Events", route: "Events" },
  { title: "Contact Us", route: "ContactUs" },
];

export const linking: LinkingOptions<ParamListBase> = {
  prefixes: ["nykea.org", "nykea://"],
  config: {
    screens: {
      Home: "home",
      About: "about",
      Groups: "groups",
      Services: "services",
      Events: "events",
      ContactUs: "contact-us",
    },
  },
};
