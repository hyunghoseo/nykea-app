import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useHover } from "react-native-web-hooks";

import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";
import { useTranslation } from "@/hooks/useTranslation";

interface PaginationButtonProps {
  onPress: () => void;
  active?: boolean;
  icon?: string;
  text?: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onPress,
  active = false,
  icon,
  text,
}) => {
  const styles = useStyles();
  const ref = useRef<TouchableOpacity>(null);
  const isHovered = useHover(ref);

  return (
    <TouchableOpacity ref={ref} style={styles.paginationButton}>
      {icon && <Icon color={theme.colors.primary[0]} name={icon} size={34} />}
      <Text
        style={[
          styles.paginationButtonText,
          !icon && styles.paginationButtonNoIconText,
          active && styles.paginationButtonTextActive,
          isHovered && styles.paginationButtonTextHovered,
        ]}
      >
        {text} {active && "•"}
      </Text>
    </TouchableOpacity>
  );
};

interface PaginationProps {
  setPage: (page: number) => void;
  pagination: {
    page?: number;
    pageSize?: number;
    pageCount?: number;
    total?: number;
  };
}

export const Pagination: React.FC<PaginationProps> = ({
  setPage,
  pagination,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { page = 0, pageSize = 20, pageCount = 1, total = 0 } = pagination;

  console.log(pagination);

  return (
    <View style={styles.paginationSection}>
      <PaginationButton
        onPress={() => setPage(page - 1)}
        icon="chevron-left"
        text={t("pagination.previous")}
      />
      {new Array(pageCount).fill(null).map((_, index) => (
        <PaginationButton
          key={index}
          onPress={() => setPage(index + 1)}
          active={page === index + 1}
          text={(index + 1).toString()}
        />
      ))}
      <PaginationButton
        onPress={() => setPage(page + 1)}
        icon="chevron-right"
        text={t("pagination.next")}
      />
    </View>
  );
};

const useStyles = () => {
  const { locale } = useLocale();

  return StyleSheet.create({
    paginationSection: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 16,
      alignSelf: "center",
    },
    paginationButton: {
      width: 50,
      height: 84,
      alignItems: "center",
      justifyContent: "center",
      color: theme.colors.primary[0],
    },
    paginationButtonText: {
      fontFamily:
        locale === "en" ? "KumbhSans_500Medium" : "NotoSansKR_500Medium",
      color: theme.colors.primary[0],
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5,
      borderBottomWidth: 1,
      borderBottomColor: "transparent",
    },
    paginationButtonNoIconText: {
      fontSize: 16,
      lineHeight: 24,
    },
    paginationButtonTextHovered: {
      color: theme.colors.primary[0],
      borderBottomColor: theme.colors.primary[0],
    },
    paginationButtonTextActive: {
      fontFamily: locale === "en" ? "KumbhSans_700Bold" : "NotoSansKR_700Bold",
      color: theme.colors.primary[0],
      letterSpacing: 0.4,
    },
  });
};
