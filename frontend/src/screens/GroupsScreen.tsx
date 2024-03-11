import { H1, H2, P } from "@expo/html-elements";
import { Link } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import reactStringReplace from "react-string-replace";

import { theme } from "@/config/theme";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { useGetGroups } from "@/api/apiComponents";
import { Group } from "@/api/apiSchemas";
import { GroupList } from "@/components/GroupCard";
import ScreenWrapper from "@/components/ScreenWrapper";

export const GroupsScreen = () => {
  const { data: { data: groups } = {}, isLoading, isError } = useGetGroups({});
  const { t } = useTranslation();
  const { h1, h2, bodyNormal, link } = useTypographyStyles();
  const styles = useStyles();

  const groupTypes: NonNullable<Group["Type"]>[] = [
    "Administrative",
    "Community",
    "Education",
    "Activities",
  ];

  return (
    <ScreenWrapper>
      <View style={styles.headerSection}>
        <H1 style={[h1, styles.headerTitle]}>{t("page.Groups.title")}</H1>
        <P style={[bodyNormal, styles.headerDescription]}>
          {reactStringReplace(
            t("page.Groups.description"),
            "{link}",
            (index) => (
              <Link key={index} to={{ screen: "ContactUs" }} style={link}>
                {t("page.Groups.description.linkText")}
              </Link>
            ),
          )}
        </P>
      </View>
      <View style={styles.mainSection}>
        {isError ? (
          <P style={bodyNormal}>There was an error getting groups</P>
        ) : null}
        {groupTypes.map((groupType) => (
          <View key={groupType} style={styles.groupSection}>
            <H2 style={[h2, styles.groupTitle]}>
              {t(`page.Groups.types.${groupType}`)}
            </H2>
            <GroupList
              groupKey={groupType}
              isLoading={isLoading}
              groups={groups?.filter(
                (group) => group.attributes?.Type === groupType,
              )}
            />
          </View>
        ))}
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
    headerDescription: {
      textAlign: isMobile ? "auto" : "center",
    },
    mainSection: {
      width: "100%",
      maxWidth: 1328,
      marginVertical: 32,
      gap: isMobile ? 32 : 40,
      alignItems: "flex-start",
    },
    groupSection: { width: "100%", gap: 24 },
    groupTitle: {
      color: theme.colors.primary[0],
    },
  });
};
