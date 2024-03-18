import { Announcement } from "@/api/apiSchemas";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { Skeleton } from "moti/skeleton";
import { H1 } from "@expo/html-elements";

interface AnnouncementCardProps extends Partial<Announcement> {
    isLoading?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = (props) => {
    const styles = useStyles();

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.6}
            disabled={props.isLoading}
        >
            <Skeleton.Group show={Boolean(props.isLoading)}>
                <Skeleton colorMode="light">
                    <H1>hello</H1>
                </Skeleton>
            </Skeleton.Group>
        </TouchableOpacity>
    )
}

const useStyles = () => {
    const { isMobile } = useResponsiveLayout();

    return StyleSheet.create({
        container: {
            flex: 1,
            gap: 32,
            shadowColor: "#868686",
            // only affect Web and iOS
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 1.51,
            // only affect Android
            elevation: 20,
            // backgroundColor: "#f1ff4f"
        },
    })
}