import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "react-native-elements";

import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";
import { useNavigationRef } from "@/contexts/NavigationProvider";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { AnnouncementListResponseDataItem } from "@/api/apiSchemas";

import { AnnouncementCard } from "./AnnouncementCard";

interface HorizontalAnnouncementListProps {
  isLoading: boolean;
  announcements?: AnnouncementListResponseDataItem[];
}

export const HorizontalAnnouncementList: React.FC<
  HorizontalAnnouncementListProps
> = ({ isLoading, announcements }) => {
  const { locale } = useLocale();
  const styles = useStyles(locale);
  const { isTablet, isDesktop, isWeb, isMobile } = useResponsiveLayout();
  const { t } = useTranslation();
  const { navigationRef } = useNavigationRef();

  const numItems = isDesktop ? 3 : isTablet ? 2 : 1;
  const maxItems = isDesktop ? 3 : isTablet ? 2 : 2;

  const renderItem = ({
    item,
  }: {
    item: AnnouncementListResponseDataItem;
    index: number;
  }) => {
    if (!item.attributes && !isLoading) return null;

    return (
      <View style={styles.cardWrapper}>
        <AnnouncementCard
          id={item.id}
          {...(item.attributes || {})}
          isLoading={isLoading}
          style={styles.card}
          titleNumberOfLines={4}
          descriptionNumberOfLines={12}
          height={380}
        />
      </View>
    );
  };

  const baseData =
    !isLoading && announcements && announcements.length > 0
      ? announcements
      : Array(isWeb ? maxItems : 3)
          .fill(null)
          .map((_, index) => ({ id: index, attributes: undefined }));

  const data = isWeb && maxItems > 0 ? baseData.slice(0, maxItems) : baseData;

  const renderAnnouncementsButton = () => (
    <TouchableOpacity
      onPress={() => {
        navigationRef.current?.navigate("Announcements");
      }}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{t("home.seeAllAnnouncements")}</Text>
    </TouchableOpacity>
  );

  if (isWeb) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t("home.announcements")}</Text>
          {!isMobile && renderAnnouncementsButton()}
        </View>
        <FlatList
          key={numItems}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item.id?.toString() || `placeholder-${index}`
          }
          numColumns={numItems}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={numItems > 1 ? styles.columnWrapper : undefined}
        />
        {isMobile && (
          <View style={styles.footer}>{renderAnnouncementsButton()}</View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.id?.toString() || `placeholder-${index}`
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      />
      <View style={styles.footer}>{renderAnnouncementsButton()}</View>
    </View>
  );
};

const useStyles = (locale: string) => {
  const { isMobile, isTablet, isDesktop } = useResponsiveLayout();
  const isWeb = Platform.OS === "web";

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary[9],
      paddingVertical: isMobile ? 32 : 48,
    },
    scrollContent: {
      gap: 32,
      paddingHorizontal: 32,
    },
    gridContent: {
      gap: 16,
      paddingHorizontal: 32,
    },
    columnWrapper: {
      gap: 32,
      justifyContent: isWeb ? "flex-start" : "center",
    },
    cardWrapper: {
      flex: isWeb ? 1 : undefined,
      maxWidth: isWeb ? undefined : undefined,
      marginBottom: isWeb ? (isDesktop ? 32 : 20) : 0,
      width: isMobile && !isWeb ? 280 : "auto",
      alignSelf: isWeb && !isTablet && !isDesktop ? "center" : undefined,
    },
    card: {
      flex: 0,
      width: "100%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 32,
      marginBottom: 32,
    },
    footer: {
      flexDirection: "row",
      paddingHorizontal: 32,
      justifyContent: "flex-start",
      marginVertical: 8,
    },
    title: {
      fontSize: 32,
      fontFamily:
        locale === "ko" ? "NotoSansKR_500Medium" : "NotoSans_600SemiBold",
      color: theme.colors.primary[0],
      marginBottom: 0,
      textAlign: "left",
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 30,
      backgroundColor: theme.colors.primary[0],
    },
    buttonText: {
      fontSize: 14,
      fontFamily:
        locale === "ko" ? "NotoSansKR_500Medium" : "NotoSans_500Medium",
      color: colors.white,
    },
  });
};
