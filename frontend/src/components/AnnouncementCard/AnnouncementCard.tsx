import { H3, P } from "@expo/html-elements";
import Moment from "moment";
import { Skeleton } from "moti/skeleton";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Shadow } from "react-native-shadow-2";

import { useNavigationRef } from "@/contexts/NavigationProvider";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { Announcement } from "@/api/apiSchemas";

import { Tag } from "../Layout/Tag";

interface AnnouncementCardProps extends Partial<Announcement> {
  id: number | undefined;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = (props) => {
  const styles = useStyles();
  const { h3, date, bodyNormal } = useTypographyStyles();
  const { navigationRef } = useNavigationRef();

  const getPlainText = (rawText: { children: { text: any }[] }[]) => {
    let text = "";
    for (const index in rawText) {
      text += rawText[index].children[0].text + "\n";
    }
    return text;
  };

  console.log(props.id);

  return (
    <Shadow
      style={styles.outerContainer}
      endColor="#86868600"
      startColor="#8686861a"
      distance={15}
    >
      <TouchableOpacity
        style={styles.innerContainer}
        activeOpacity={0.6}
        disabled={props.isLoading}
        onPress={() =>
          navigationRef.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
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
              {getPlainText(props.Description)}
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
      borderBlockColor: 0,
    },
    innerContainer: {
      backgroundColor: "white",
      borderRadius: 8,
      paddingHorizontal: 24,
      paddingVertical: 32,
      width: "100%",
      borderWidth: 0,
      alignItems: "flex-start",
      height: isMobile ? "100%" : 357,
      overflow: "hidden",
    },
    text: {
      marginBottom: 8,
    },
  });
};
