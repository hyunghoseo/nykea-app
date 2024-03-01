import { navRoutes } from "@/config/navigation";
import { Locale } from "@/contexts/LocaleProvider";

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
    "nav.Announcements": "Announcements",
    "nav.ContactUs": "Contact Us",
  },
  ko: {
    home: "뉴욕한인교회",
    "nav.About": "교회 소개",
    "nav.Groups": "부서 및 동아리",
    "nav.Services": "주일 예배",
    "nav.Events": "이벤트",
    "nav.Announcements": "공지사항",
    "nav.ContactUs": "문의하기",
  },
  ja: {
    home: "NY KEA Family Church",
    "nav.About": "About Us",
    "nav.Groups": "Groups",
    "nav.Services": "Sunday Services",
    "nav.Events": "Events",
    "nav.Announcements": "Announcements",
    "nav.ContactUs": "Contact Us",
  },
};
