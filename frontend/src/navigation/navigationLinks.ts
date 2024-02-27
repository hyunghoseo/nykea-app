import { LinkingOptions, ParamListBase } from "@react-navigation/native";

export interface NavLink {
  title: string;
  route: string;
}

export const navigationLinks = [
  { title: "About Us", route: "About" },
  { title: "Groups", route: "Groups" },
  { title: "Sunday Services", route: "Services" },
  { title: "Events", route: "Events" },
  { title: "Contact Us", route: "Contact Us" },
];

export const linking: LinkingOptions<ParamListBase> = {
  prefixes: ["nykea.org", "nykea://"],
  config: {
    screens: {
      Home: "",
      About: "about",
      Groups: "groups",
      Services: "services",
      Events: "events",
      "Contact Us": "contact-us",
    },
  },
};
