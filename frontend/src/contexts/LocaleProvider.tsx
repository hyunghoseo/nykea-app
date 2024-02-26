import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Platform } from "react-native";
import { getLocales } from "expo-localization";

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
  const locales = getLocales();
  const localeCode = locales[0].languageCode || "";
  return ["en", "ko", "ja"].includes(localeCode)
    ? (localeCode as Locale)
    : defaultLocale;
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
