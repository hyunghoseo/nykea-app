import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { useLocale, Locale } from "@/contexts/LocaleProvider";

interface LanguageOption {
  locale: Locale;
  label: string;
  flag: ImageSourcePropType;
}

const languageOptions: LanguageOption[] = [
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

const LanguageDropdown: React.FC = () => {
  const { locale, setLocale } = useLocale();
  const [data, setData] = useState(languageOptions);

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

  const renderLabel = (item: LanguageOption) => {
    return (
      <View style={styles.item}>
        <Image source={item.flag} style={styles.flag} />
        <Text style={styles.text}>{item.label}</Text>
      </View>
    );
  };

  const renderLeftIcon = () => {
    return <Image source={currentLocaleOption.flag} style={styles.flag} />;
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        itemContainerStyle={styles.dropdownItemContainer}
        selectedTextStyle={styles.text}
        placeholderStyle={styles.text}
        activeColor="#E9EFF6"
        data={data}
        labelField="label"
        valueField="locale"
        placeholder={currentLocaleOption.label}
        value={locale}
        onChange={(item) => setLocale(item.locale)}
        renderItem={renderLabel}
        renderLeftIcon={renderLeftIcon}
        fontFamily="KumbhSans_500Medium"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 40,
    width: 124,
    borderColor: "#EAEAEA",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 3,
  },
  dropdownContainer: {
    borderRadius: 4,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // for Android
  },
  dropdownItemContainer: {
    padding: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: 18,
    height: 18,
    margin: 6,
  },
  text: {
    fontFamily: "KumbhSans_500Medium",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    marginHorizontal: 4,
  },
});

export default LanguageDropdown;
