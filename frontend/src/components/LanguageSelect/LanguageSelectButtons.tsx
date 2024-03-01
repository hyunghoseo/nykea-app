import { useRef } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useHover } from "react-native-web-hooks";

import { LanguageOption, languageOptions } from "@/config/languages";
import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";

const LanguageButton: React.FC<LanguageOption> = (languageOption) => {
  const ref = useRef<TouchableOpacity>(null);
  const isHovered = useHover(ref);

  const { locale, setLocale } = useLocale();

  return (
    <TouchableOpacity
      ref={ref}
      onPress={() => setLocale(languageOption.locale)}
      activeOpacity={0.6}
      hitSlop={8}
      style={[
        styles.button,
        isHovered && styles.buttonHovered,
        languageOption.locale === locale && styles.buttonActive,
      ]}
    >
      <Image source={languageOption.flag} style={styles.flag} />
      <Text
        style={[
          styles.text,
          languageOption.locale === "en" ? styles.textEn : styles.textKo,
        ]}
      >
        {languageOption.label}
      </Text>
    </TouchableOpacity>
  );
};

export const LanguageSelectButtons: React.FC = () => {
  return (
    <View style={styles.container}>
      {languageOptions.map((option) => (
        <LanguageButton key={option.locale} {...option} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 32,
  },
  button: {
    height: 40,
    flexDirection: "row",
    borderColor: "#EAEAEA",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
  buttonHovered: {
    backgroundColor: theme.colors.primary[8],
  },
  buttonActive: {
    backgroundColor: theme.colors.primary[9],
  },
  flag: {
    width: 24,
    height: 24,
  },
  icon: {},
  text: {
    color: "#595959",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.25,
    paddingHorizontal: 4,
  },
  textEn: {
    fontFamily: "KumbhSans_500Medium",
  },
  textKo: {
    fontFamily: "NotoSansKR_500Medium",
  },
});
