import { StyleSheet, View } from "react-native";
import { H1, P } from "@expo/html-elements";

import { theme } from "@/config/theme";
import ScreenWrapper from "../components/ScreenWrapper";
import { useGetPrivatePolicy } from "@/api/apiComponents";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { RichText } from "../components/Layout/RichText";

export const PolicyScreen = () => {
  const {
    data: { data: { attributes: { Policy: policy } = {} } = {} } = {},
    isError,
    isLoading
  } = useGetPrivatePolicy({});
  const { t } = useTranslation();
  const styles = useStyles();
  const { h1, bodyNormal } = useTypographyStyles();
  return (
    <ScreenWrapper>
      <View style={styles.headerSection}>
        <H1 style={[h1, styles.headerTitle]}>
          {t("page.policies.title")}
        </H1>
      </View>
      <View style={styles.mainSection}>
        {isError ? (
          <P style={bodyNormal}>There was an error getting private policy</P>
        ) : null}
        {!isError && !isLoading && policy ? (
          <RichText content={policy} />
        ) : (
            <View>
              <P style={bodyNormal}>Still loading</P>
            </View>
          )}
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
    },
    headerTitle: {
      color: theme.colors.primary[0],
    },
    mainSection: {
      width: "100%",
      maxWidth: 672,
      marginVertical: 32,
      gap: 32,
      alignItems: "flex-start",
    },
    announcementSection: { width: "100%", gap: 24 },
  });
};