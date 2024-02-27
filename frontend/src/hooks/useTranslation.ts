import { translations, TranslationEntryKey } from "@/config/translations";
import { useLocale } from "@/contexts/LocaleProvider";

export const useTranslation = () => {
  const { locale } = useLocale();

  const t = (key: TranslationEntryKey): string => {
    return translations[locale][key];
  };

  return { t };
};
