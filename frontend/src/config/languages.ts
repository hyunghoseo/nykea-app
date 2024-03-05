import { ImageSourcePropType } from "react-native";

export type Locale = "en" | "ko" | "ja";

export interface LanguageOption {
  locale: Locale;
  label: string;
  flag: ImageSourcePropType;
}

export const languageOptions: LanguageOption[] = [
  {
    locale: "en",
    label: "English",
    flag: require("@/assets/flag-english.png"),
  },
  {
    locale: "ko",
    label: "한국어",
    flag: require("@/assets/flag-korean.png"),
  },
];
