import { H3, P } from "@expo/html-elements";
import Moment from "moment";
import { Skeleton } from "moti/skeleton";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Shadow } from "react-native-shadow-2";

import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { Announcement } from "@/api/apiSchemas";

import { Tag } from "../Layout/Tag";
import { LinearGradient } from "react-native-svg";

interface AnnouncementCardProps extends Partial<Announcement> {
    isLoading?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = (props) => {
    const styles = useStyles();
    const { h3, date, bodyNormal } = useTypographyStyles();

    return (
        <Shadow
            style={styles.outerContainer}
            endColor="#86868600"
            startColor="#8686861a"
            distance={15}
            offset={[4, 4]}
        >
            <TouchableOpacity
                style={styles.innerContainer}
                activeOpacity={0.6}
                disabled={props.isLoading}
            >
                <Skeleton.Group show={Boolean(props.isLoading)}>
                    {props.HostingGroup?.data && (
                        <Skeleton colorMode="light">

                            <Tag text={props.HostingGroup?.data?.attributes?.Name} />

                        </Skeleton>
                    )}
                    <Skeleton colorMode="light">
                        <P style={[date, styles.text]}>
                            Posted on {Moment(props.publishedAt).format("MM/DD/YY")}
                        </P>
                    </Skeleton>
                    <Skeleton colorMode="light">
                        <H3 style={[h3, styles.text]}>{props.Title}</H3>
                    </Skeleton>
                    <Skeleton colorMode="light">
                        <P style={bodyNormal}>{props.Description}</P>
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
            backgroundColor: "white",
            gap: 32,
            width: "100%",
            borderRadius: 8,
        },
        innerContainer: {
            paddingHorizontal: 24,
            paddingVertical: 32,
            width: "100%",
            alignItems: "flex-start",
            height: 357,
            overflow: "hidden",
        },
        text: {
            marginBottom: 8,
        }
    });
};
