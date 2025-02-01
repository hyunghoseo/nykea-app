import { useRef } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useActive, useHover } from "react-native-web-hooks";

import { LanguageOption, languageOptions } from "@/config/languages";
import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";

const LanguageButton: React.FC<LanguageOption> = (languageOption) => {
  const ref = useRef<TouchableHighlight>(null);
  const isHovered = useHover(ref);
  const isActive = useActive(ref);

  const { locale, setLocale } = useLocale();

  return (
    <TouchableHighlight
      ref={ref}
      onPress={() => setLocale(languageOption.locale)}
      underlayColor={theme.colors.primary[8]}
      hitSlop={8}
      style={[
        styles.button,
        (isHovered || isActive) && styles.buttonHovered,
        languageOption.locale === locale && styles.buttonActive,
      ]}
    >
      <View style={styles.buttonContent}>
        <Image source={languageOption.flag} style={styles.flag} />
        <Text
          style={[
            styles.text,
            languageOption.locale === "en" ? styles.textEn : styles.textKo,
          ]}
        >
          {languageOption.label}
        </Text>
      </View>
    </TouchableHighlight>
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
  buttonContent: {
    flexDirection: "row",
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
