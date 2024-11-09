import { useState } from "react";
import { H1, P } from "@expo/html-elements";
import { StyleSheet, View } from "react-native";

import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { useGetAnnouncements } from "@/api/apiComponents";
import { AnnouncementList } from "@/components/AnnouncementCard/AnnouncementList";
import { Pagination } from "@/components/Pagination/Pagination";

import ScreenWrapper from "../../components/ScreenWrapper";

export const AnnouncementsScreen = () => {
  const [page, setPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const { locale } = useLocale();

  const {
    data: { data: announcements = [], meta: { pagination = {} } = {} } = {},
    isLoading,
    isError,
  } = useGetAnnouncements({
    queryParams: {
      "pagination[pageSize]": pageSize,
      "pagination[page]": page,
      locale,
    },
  });

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
          <Pagination
            setPage={setPage}
            pagination={{
              page: 2,
              pageSize: 10,
              pageCount: 6,
              total: 100,
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    headerSection: {
      alignItems: "center",
      maxWidth: 648,
      gap: 24,
      marginVertical: 32,
      paddingHorizontal: 32,
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
      paddingHorizontal: 32,
    },
    announcementSection: { width: "100%", gap: 24 },
  });
};
