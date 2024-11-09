import { H4, P } from "@expo/html-elements";
import { ViewStyle } from "@expo/html-elements/build/primitives/View";
import { Image } from "expo-image";
import { Skeleton } from "moti/skeleton";
import { StyleProp, StyleSheet, TouchableOpacity, View } from "react-native";

import { PLACEHOLDER_BLUR_HASH } from "@/config/constants";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { Group } from "@/api/apiSchemas";

interface GroupCardProps extends Partial<Group> {
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const GroupCard: React.FC<GroupCardProps> = (props) => {
  const styles = useStyles();
  const { h4, bodySmall, overline } = useTypographyStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      disabled={props.isLoading}
    >
      <Skeleton.Group show={Boolean(props.isLoading)}>
        <Skeleton colorMode="light">
          <Image
            style={styles.image}
            contentFit="cover"
            placeholder={PLACEHOLDER_BLUR_HASH}
            source={
              props.Picture?.data
                ? {
                    uri: props.Picture?.data?.attributes?.url,
                  }
                : require("@/assets/placeholder.png")
            }
            transition={500}
          />
        </Skeleton>
        <View style={styles.detailsSection}>
          <Skeleton colorMode="light">
            <H4 style={h4}>{props.Name}</H4>
          </Skeleton>
          <Skeleton colorMode="light">
            <P style={overline}>{props.Criteria}</P>
          </Skeleton>
          <Skeleton colorMode="light">
            <P style={bodySmall}>{props.ShortDescription}</P>
          </Skeleton>
        </View>
      </Skeleton.Group>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { isMobile } = useResponsiveLayout();

  return StyleSheet.create({
    container: { flex: 1, gap: isMobile ? 12 : 16 },
    image: {
      aspectRatio: 1,
      width: "100%",
      height: "auto",
      pointerEvents: "none",
    },
    detailsSection: { gap: isMobile ? 4 : 8 },
  });
};
