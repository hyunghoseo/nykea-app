import { Locale } from "@/contexts/LocaleProvider";
import { navRoutes } from "@/navigation/AppNavigator";

type NavRoute = (typeof navRoutes)[number];
type PrefixedNavRoute = `nav.${NavRoute}`;

export type TranslationEntryKey = PrefixedNavRoute | "home";

type Translations = {
  [key in Locale]: { [key in TranslationEntryKey]: string };
};

export const translations: Translations = {
  en: {
    home: "NY KEA Family Church",
    "nav.About": "About Us",
    "nav.Groups": "Groups",
    "nav.Services": "Sunday Services",
    "nav.Events": "Events",
    "nav.ContactUs": "Contact Us",
  },
  ko: {
    home: "뉴욕한인교회",
    "nav.About": "교회 소개",
    "nav.Groups": "그룹",
    "nav.Services": "주일 예배",
    "nav.Events": "행사",
    "nav.ContactUs": "연락처",
  },
  ja: {
    home: "NY KEA Family Church",
    "nav.About": "About Us",
    "nav.Groups": "Groups",
    "nav.Services": "Sunday Services",
    "nav.Events": "Events",
    "nav.ContactUs": "Contact Us",
  },
};
