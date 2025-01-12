import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useHover } from "react-native-web-hooks";

import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";
import { useTranslation } from "@/hooks/useTranslation";

interface PaginationNavButtonProps {
  onPress: () => void;
  icon?: string;
  text?: string;
}

const PaginationNavButton: React.FC<PaginationNavButtonProps> = ({
  onPress,
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
          isHovered && styles.paginationButtonTextHovered,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

interface PaginationNumberButtonProps {
  onPress: () => void;
  active?: boolean;
  number?: string;
}

const PaginationNumberButton: React.FC<PaginationNumberButtonProps> = ({
  onPress,
  active = false,
  number,
}) => {
  const styles = useStyles();
  const ref = useRef<TouchableOpacity>(null);
  const isHovered = useHover(ref);

  return (
    <TouchableOpacity ref={ref} style={styles.paginationButton}>
      <Text
        style={[
          styles.paginationButtonText,
          styles.paginationNumberButtonText,
          active && styles.paginationButtonTextActive,
          isHovered && styles.paginationButtonTextHovered,
        ]}
      >
        {number}
      </Text>
      <Text style={[styles.paginationNumberButtonActiveDot]}>
        {active && "•"}
      </Text>
    </TouchableOpacity>
  );
};

const PaginationEllipsis: React.FC = () => {
  const styles = useStyles();

  return (
    <View style={styles.ellipsis}>
      <Text style={styles.ellipsisText}>...</Text>
    </View>
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

  const { page = 0, pageCount = 1 } = pagination;

  const renderPaginationButtons = () => {
    const buttons = new Array(pageCount)
      .fill(null)
      .map((_, index) => (
        <PaginationNumberButton
          key={index}
          onPress={() => setPage(index + 1)}
          active={page === index + 1}
          number={(index + 1).toString()}
        />
      ));

    let firstMainNumber = page - 3;
    let lastMainNumber = page + 1;

    if (firstMainNumber < 0 || firstMainNumber === 1) {
      firstMainNumber = 0;
    }
    if (lastMainNumber > pageCount - 1) {
      lastMainNumber = pageCount - 1;
    }

    const mainButtons = buttons.slice(firstMainNumber, lastMainNumber + 1);

    return [
      firstMainNumber > 0 ? buttons[0] : null,
      firstMainNumber > 1 ? <PaginationEllipsis /> : null,
      ...mainButtons,
      lastMainNumber < pageCount - 2 ? <PaginationEllipsis /> : null,
      lastMainNumber < pageCount - 1 ? buttons[pageCount - 1] : null,
    ];
  };

  return (
    <View style={styles.paginationSection}>
      <PaginationNavButton
        onPress={() => setPage(page - 1)}
        icon="chevron-left"
        text={t("pagination.previous")}
      />
      {renderPaginationButtons()}
      <PaginationNavButton
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
      gap: 8,
      alignSelf: "center",
    },
    paginationButton: {
      width: 50,
      height: 64,
      alignItems: "center",
      justifyContent: "flex-start",
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
    paginationNumberButtonText: {
      paddingTop: 8,
      minWidth: 16,
      textAlign: "center",
      fontSize: 16,
      lineHeight: 24,
    },
    paginationNumberButtonActiveDot: {
      color: theme.colors.primary[0],
      fontSize: 18,
      lineHeight: 16,
    },
    paginationButtonTextHovered: {
      color: theme.colors.primary[0],
      borderBottomColor: theme.colors.primary[0],
    },
    paginationButtonTextActive: {
      fontFamily:
        locale === "en" ? "KumbhSans_800ExtraBold" : "NotoSansKR_900Black",
      color: theme.colors.primary[0],
      letterSpacing: 0.4,
    },
    ellipsis: {
      width: 50,
      height: 64,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    ellipsisText: {
      fontFamily:
        locale === "en" ? "KumbhSans_500Medium" : "NotoSansKR_500Medium",
      color: theme.colors.primary[0],
      paddingTop: 12,
      fontSize: 24,
      lineHeight: 24,
    },
  });
};
