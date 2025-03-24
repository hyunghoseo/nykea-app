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
  | "page.Groups.types.Activities"
  | "page.Groups.types.Music"
  | "page.Announcements.title"
  | "page.Policies.title"
  | "post.type.announcement"
  | "post.type.event"
  | "post.type.service"
  | "tag.Services.Family"
  | "tag.Services.Sunday"
  | "tag.Services.Special"
  | "tag.Services.Youth"
  | "details.postedDate"
  | "details.serviceDateTime";

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
    "post.type.announcement": "Announcement",
    "post.type.event": "Event",
    "post.type.service": "Service",
    "tag.Services.Family": "Family Service",
    "tag.Services.Sunday": "Sunday Service",
    "tag.Services.Special": "Special Service",
    "tag.Services.Youth": "Youth Service",
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
    "page.Groups.types.Music": "Music",
    "page.Announcements.title": "Announcements",
    "details.postedDate": "Posted on ",
    "details.serviceDateTime": "Service on ",
    "page.Policies.title": "Private Policy",
  },
  ko: {
    home: "뉴욕한인교회",
    "nav.About": "교회 소개",
    "nav.Groups": "부서 및 동아리",
    "nav.Services": "주일 예배",
    "nav.Events": "이벤트",
    "nav.Announcements": "공지사항",
    "nav.ContactUs": "문의하기",
    "post.type.announcement": "공지사항",
    "post.type.event": "이벤트",
    "post.type.service": "예배",
    "tag.Services.Family": "가정 예배",
    "tag.Services.Sunday": "일요 예배",
    "tag.Services.Special": "특별 예배",
    "tag.Services.Youth": "청년 예배",
    "icon.Menu": "메 뉴",
    "icon.Close": "닫 기",
    "page.Groups.title": "부서 및 동아리",
    "page.Groups.description":
      "뉴욕한인가정교회의 부서 및 동아리에 대해 자세히 알아보세요. 각 부서 및 그룹들은 교회에 기여하고 다양한 관심사로 커뮤니티에 문화 교류의 장을 마련합니다. 더 많은 그룹에 참여하고 싶으시거나 궁금한 점이 있으신가요? {link}.",
    "page.Groups.description.linkText": "문의해주세요",
    "page.Groups.types.Administrative": "부서",
    "page.Groups.types.Community": "커뮤니티 ",
    "page.Groups.types.Education": "교육",
    "page.Groups.types.Activities": "동아리",
    "page.Groups.types.Music": "음악",
    "page.Announcements.title": "공지사항",
    "details.postedDate": "작성 날짜  ",
    "details.serviceDateTime": "천일국가 ",
    "page.Policies.title": "이용 약관",
  },
  ja: {
    home: "NY Korean Family Church",
    "nav.About": "About Us",
    "nav.Groups": "Groups",
    "nav.Services": "Sunday Services",
    "nav.Events": "Events",
    "nav.Announcements": "Announcements",
    "nav.ContactUs": "Contact Us",
    "post.type.announcement": "Announcement",
    "post.type.event": "Event",
    "post.type.service": "Service",
    "tag.Services.Family": "Family Service",
    "tag.Services.Sunday": "Sunday Service",
    "tag.Services.Special": "Special Service",
    "tag.Services.Youth": "Youth Service",
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
    "page.Groups.types.Music": "Music",
    "page.Announcements.title": "Announcements",
    "details.postedDate": "Posted on ",
    "details.serviceDateTime": "Service on ",
    "page.Policies.title": "Private Policy",
  },
};
