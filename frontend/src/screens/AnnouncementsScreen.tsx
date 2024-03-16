import { StyleSheet, View } from "react-native";

import ScreenWrapper from "../components/ScreenWrapper";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { theme } from "@/config/theme";
import { H1 } from "@expo/html-elements";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { useTranslation } from "@/hooks/useTranslation";

export const AnnouncementsScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { h1 } = useTypographyStyles();
  return (
    <ScreenWrapper>
      <View style={styles.headerSection}>
        <H1 style={[h1, styles.headerTitle]}>{t("page.Announcements.title")}</H1>
      </View>
      <View style={styles.mainSection}>

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
  })
}
