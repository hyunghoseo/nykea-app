import { navRoutes } from "@/config/navigation";
import { Locale } from "@/contexts/LocaleProvider";

type NavRoute = (typeof navRoutes)[number];
type PrefixedNavRoute = `nav.${NavRoute}`;

export type TranslationEntryKey =
  | PrefixedNavRoute
  | "home"
  | "icon.Menu"
  | "icon.Close"
  | "page.Groups.title"
  | "page.Groups.description"
  | "page.Groups.description.linkText"
  | "page.Groups.types.Administrative"
  | "page.Groups.types.Community"
  | "page.Groups.types.Education"
  | "page.Groups.types.Activities";

type Translations = {
  [key in Locale]: { [key in TranslationEntryKey]: string };
};

export const translations: Translations = {
  en: {
    home: "NY Korean Family Church",
    "nav.About": "About Us",
    "nav.Groups": "Groups",
    "nav.Services": "Sunday Services",
    "nav.Events": "Events",
    "nav.Announcements": "Announcements",
    "nav.ContactUs": "Contact Us",
    "icon.Menu": "Menu",
    "icon.Close": "Close",
    "page.Groups.title": "Groups",
    "page.Groups.description":
      "Learn more about groups at NYKEA. Each group or department has a role in the community. For more information on which groups you can get involved in, or if you have any questions, please feel free to {link}.",
    "page.Groups.description.linkText": "contact us",
    "page.Groups.types.Administrative": "Administrative Groups",
    "page.Groups.types.Community": "Community Groups",
    "page.Groups.types.Education": "Education",
    "page.Groups.types.Activities": "Activities",
  },
  ko: {
    home: "뉴욕한인교회",
    "nav.About": "교회 소개",
    "nav.Groups": "부서 및 동아리",
    "nav.Services": "주일 예배",
    "nav.Events": "이벤트",
    "nav.Announcements": "공지사항",
    "nav.ContactUs": "문의하기",
    "icon.Menu": "메 뉴",
    "icon.Close": "닫 기",
    "page.Groups.title": "부서 및 동아리",
    "page.Groups.description":
      "뉴욕한인가정교회의 부서 및 동아리 대해 자세히 알아보세요. 각 그룹 또는 부서는 커뮤니티 내에서 역할을 합니다. 참여할 수 있는 그룹이나 궁금한 사항이 있으시면 언제든지 {link}.",
    "page.Groups.description.linkText": "연락 주세요",
    "page.Groups.types.Administrative": "부서",
    "page.Groups.types.Community": "커뮤니티 ",
    "page.Groups.types.Education": "교육",
    "page.Groups.types.Activities": "동아리",
  },
  ja: {
    home: "NY Korean Family Church",
    "nav.About": "About Us",
    "nav.Groups": "Groups",
    "nav.Services": "Sunday Services",
    "nav.Events": "Events",
    "nav.Announcements": "Announcements",
    "nav.ContactUs": "Contact Us",
    "icon.Menu": "Menu",
    "icon.Close": "Close",
    "page.Groups.title": "Groups",
    "page.Groups.description":
      "Learn more about groups at NYKEA. Each group or department has a role in the community. For more information on which groups you can get involved in, or if you have any questions, please feel free to {link}.",
    "page.Groups.description.linkText": "contact us",
    "page.Groups.types.Administrative": "Administrative",
    "page.Groups.types.Community": "Community",
    "page.Groups.types.Education": "Education",
    "page.Groups.types.Activities": "Activities",
  },
};
