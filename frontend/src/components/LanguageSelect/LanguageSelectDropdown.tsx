import { useEffect, useRef, useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useHover } from "react-native-web-hooks";

import { LanguageOption, languageOptions } from "@/config/languages";
import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";
import ChevronDown from "@/assets/chevron-down.svg";
import Minus from "@/assets/minus.svg";

const DropdownItem: React.FC<LanguageOption> = (languageOption) => {
  const ref = useRef<View>(null);
  const isHovered = useHover(ref);

  return (
    <View ref={ref} style={[styles.item, isHovered && styles.itemHovered]}>
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
  );
};
export const LanguageSelectDropdown: React.FC = () => {
  const { locale, setLocale } = useLocale();
  const [data, setData] = useState(languageOptions);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Filter out the selected language
    const filteredData = languageOptions.filter(
      (item) => item.locale !== locale,
    );
    setData(filteredData);
  }, [locale]);

  const currentLocaleOption =
    languageOptions.find((option) => option.locale === locale) ||
    languageOptions[0];

  const renderLabel = (item: LanguageOption) => <DropdownItem {...item} />;

  const renderLeftIcon = () => (
    <Image source={currentLocaleOption.flag} style={styles.flag} />
  );

  const renderRightIcon = () =>
    isMenuOpen ? (
      <Minus style={styles.icon} />
    ) : (
      <ChevronDown style={styles.icon} />
    );

  const textStyles = [
    styles.text,
    currentLocaleOption.locale === "en" ? styles.textEn : styles.textKo,
  ];

  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownMenu}
        itemContainerStyle={styles.dropdownItem}
        selectedTextStyle={textStyles}
        placeholderStyle={textStyles}
        iconStyle={{ height: 24, width: 24 }}
        activeColor={theme.colors.primary[9]}
        data={data}
        labelField="label"
        valueField="locale"
        placeholder={currentLocaleOption.label}
        value={locale}
        onChange={(item) => setLocale(item.locale)}
        renderItem={renderLabel}
        renderLeftIcon={renderLeftIcon}
        renderRightIcon={renderRightIcon}
        onFocus={() => setIsMenuOpen(true)}
        onBlur={() => setIsMenuOpen(false)}
        mode="auto" // Needs this to guarantee dropdown rather than modal
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
  dropdown: {
    height: 40,
    width: 124,
    borderColor: "#EAEAEA",
    borderWidth: 1,
    borderRadius: 4,
  },
  dropdownMenu: {
    borderRadius: 4,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // for Android
  },
  dropdownItem: {},
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  itemHovered: {
    backgroundColor: theme.colors.primary[8],
  },
  flag: {
    width: 24,
    height: 24,
    margin: 8,
  },
  icon: { margin: 8 },
  text: {
    color: "#595959",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.25,
  },
  textEn: {
    fontFamily: "KumbhSans_500Medium",
  },
  textKo: {
    fontFamily: "NotoSansKR_500Medium",
  },
});
