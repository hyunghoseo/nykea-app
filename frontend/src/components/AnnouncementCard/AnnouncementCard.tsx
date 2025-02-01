import { useRef } from "react";
import { H3, P } from "@expo/html-elements";
import Moment from "moment";
import { Skeleton } from "moti/skeleton";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { useActive, useHover } from "react-native-web-hooks";

import { theme } from "@/config/theme";
import { useNavigationRef } from "@/contexts/NavigationProvider";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { Announcement } from "@/api/apiSchemas";

import { Tag } from "../Layout/Tag";

interface AnnouncementCardProps extends Partial<Announcement> {
  id?: number;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = (props) => {
  const styles = useStyles();
  const ref = useRef<TouchableOpacity>(null);
  const isHovered = useHover(ref);
  const isActive = useActive(ref);
  const { h3, date, bodyNormal } = useTypographyStyles();
  const { navigationRef } = useNavigationRef();

  const getPlainText = (rawText: { children: { text: any }[] }[]) => {
    let text = "";
    for (const index in rawText) {
      text += rawText[index].children[0].text + "\n";
    }
    return text;
  };

  return (
    <Shadow
      style={styles.outerContainer}
      endColor="#86868600"
      startColor="#8686861a"
      distance={15}
    >
      <TouchableOpacity
        ref={ref}
        style={[
          styles.innerContainer,
          (isHovered || isActive) && styles.innerContainerHovered,
        ]}
        activeOpacity={0.6}
        disabled={props.isLoading}
        onPress={() =>
          navigationRef.navigate("AnnouncementDetails", {
            id: props.id || 0,
          })
        }
      >
        <Skeleton.Group show={Boolean(props.isLoading)}>
          {props.HostingGroup?.data && (
            <Skeleton colorMode="light">
              <Tag text={props.HostingGroup?.data?.attributes?.Name} />
            </Skeleton>
          )}
          <Skeleton colorMode="light">
            <P style={[date, styles.text]}>
              Posted on {Moment(props.publishedAt).format("MM.DD.YY")}
            </P>
          </Skeleton>
          <Skeleton colorMode="light">
            <H3 style={[h3, styles.text]} numberOfLines={3}>
              {props.Title}
            </H3>
          </Skeleton>
          <Skeleton colorMode="light">
            <P style={bodyNormal} numberOfLines={3} ellipsizeMode="clip">
              {props.Description ? getPlainText(props.Description) : ""}
            </P>
          </Skeleton>
        </Skeleton.Group>
      </TouchableOpacity>
    </Shadow>
  );
};

const useStyles = () => {
  const { isMobile } = useResponsiveLayout();
  return StyleSheet.create({
    outerContainer: {
      flex: 1,
      gap: 32,
      width: "100%",
      borderRadius: 8,
      borderBlockColor: "transparent",
    },
    innerContainer: {
      backgroundColor: "white",
      borderRadius: 8,
      paddingHorizontal: 24,
      paddingVertical: 32,
      width: "100%",
      alignItems: "flex-start",
      height: isMobile ? "100%" : 357,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: "transparent",
    },
    innerContainerHovered: {
      borderColor: theme.colors.primary[4],
    },
    text: {
      marginBottom: 8,
    },
  });
};
