import { H1, P } from "@expo/html-elements";
import { StyleSheet, View } from "react-native";

import { theme } from "@/config/theme";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { useGetAnnouncements } from "@/api/apiComponents";
import { AnnouncementList } from "@/components/AnnouncementCard/AnnouncementList";

import ScreenWrapper from "../../components/ScreenWrapper";

export const AnnouncementsScreen = () => {
  const {
    data: { data: announcements } = {},
    isLoading,
    isError,
  } = useGetAnnouncements({});
  const { t } = useTranslation();
  const styles = useStyles();
  const { h1, bodyNormal } = useTypographyStyles();
  return (
    <ScreenWrapper>
      <View style={styles.headerSection}>
        <H1 style={[h1, styles.headerTitle]}>
          {t("page.Announcements.title")}
        </H1>
      </View>
      <View style={styles.mainSection}>
        {isError ? (
          <P style={bodyNormal}>There was an error getting announcements</P>
        ) : null}
        <View style={styles.announcementSection}>
          <AnnouncementList
            isLoading={isLoading}
            announcements={announcements}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const useStyles = () => {
  const { isMobile } = useResponsiveLayout();

  return StyleSheet.create({
    headerSection: {
      alignItems: "center",
      maxWidth: 648,
      gap: 24,
      marginVertical: 32,
    },
    headerTitle: {
      color: theme.colors.primary[0],
    },
    mainSection: {
      width: "100%",
      maxWidth: 1328,
      marginVertical: 32,
      gap: 32,
      alignItems: "flex-start",
    },
    announcementSection: { width: "100%", gap: 24 },
  });
};
