import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Platform } from "react-native";
import * as RNLocalize from "react-native-localize";

export type Locale = "en" | "ko" | "ja";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const defaultLocale: Locale = "en";
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

const getDeviceLocale = (): Locale => {
  // Mobile
  if (Platform.OS !== "web") {
    const locales = RNLocalize.getLocales();
    if (locales.length > 0) {
      const localeCode = locales[0].languageTag.split("-")[0];
      return ["en", "ko", "ja"].includes(localeCode)
        ? (localeCode as Locale)
        : defaultLocale;
    }
  }
  // Web
  else {
    const browserLang = navigator.language.split("-")[0];
    return ["en", "ko", "ja"].includes(browserLang)
      ? (browserLang as Locale)
      : defaultLocale;
  }
  return defaultLocale;
};

interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(getDeviceLocale());

  useEffect(() => {
    // Load the saved locale from AsyncStorage when the app starts
    const loadLocale = async () => {
      const savedLocale = await AsyncStorage.getItem("locale");
      if (
        savedLocale &&
        (savedLocale === "en" || savedLocale === "ko" || savedLocale === "ja")
      ) {
        setLocale(savedLocale);
      }
    };

    loadLocale();
  }, []);

  const handleSetLocale = async (newLocale: Locale) => {
    setLocale(newLocale);
    await AsyncStorage.setItem("locale", newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
