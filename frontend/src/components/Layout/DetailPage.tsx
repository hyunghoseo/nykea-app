import { H2, H6, P } from "@expo/html-elements";
import { StyleSheet, View } from "react-native";
import Moment from "moment";

import { theme } from "@/config/theme";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";

import ScreenWrapper from "../ScreenWrapper";
import { Tag } from "./Tag";

interface DetailPageProps {
    type: string;
    isLoading: boolean;
    isError: boolean;
    data: any;
    tags: any;
    description: string;
}

export const DetailPage: React.FC<DetailPageProps> = (props) => {
    const styles = useStyles();
    const { h2, h6, bodyNormal } = useTypographyStyles();
    return (
        <ScreenWrapper>
            {props.isError ? (
                <P style={bodyNormal}>There was an error getting announcement</P>
            ) : null}
            {!props.isError && !props.isLoading && props.data ? (
                <View style={styles.wrapper}>
                    <View style={styles.headerSection}>
                        <View style={styles.tags}>
                            <Tag type={props.type} text={props.type} />
                            <Tag text={props.data?.attributes.HostingGroup.data.attributes.Name} />
                        </View>
                        <H2 style={[h2]}>{props.data?.attributes?.Title}</H2>
                        <View style={styles.dateSection}>
                            <H6 style={[h6, styles.date]}>Posted on {Moment(props.data?.attributes?.publishedAt).format("MMM DD.YYYY")}</H6>
                        </View>
                    </View>
                    <View style={styles.mainSection}></View>
                </View>
            ) : (
                    <View>
                        <P style={bodyNormal}>Still loading</P>
                    </View>
                )}
        </ScreenWrapper>
    );
};

const useStyles = () => {
    return StyleSheet.create({
        wrapper: {
            width: '100%',
            maxWidth: 672,
            marginBottom: 40,
        },
        headerSection: {

        },
        tags: {
            flexDirection: 'row'
        },
        dateSection: {
            marginTop: 24,
        },
        date: {
            color: theme.colors.dark,
        },
        mainSection: {
            marginBottom: 48,
        }
    });
};
