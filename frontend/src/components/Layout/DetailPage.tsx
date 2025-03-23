import { H2, H3, H6, P } from "@expo/html-elements";
import { Image } from "expo-image";
import moment from "moment";
import { StyleSheet, View } from "react-native";

import { theme } from "@/config/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { baseUrl } from "@/api/apiFetcher";
import { CommonLinkComponent } from "@/api/apiSchemas";

import ScreenWrapper from "../ScreenWrapper";
import { Button, ButtonTypes } from "./Button";
import { EventDetails } from "./Event/EventDetails";
import { Gallery } from "./Gallery";
import { RichText } from "./RichText";
import { Tag } from "./Tag";
import { FloatingBar } from "./FloatingBar";

interface DetailPageProps {
  type: "announcement" | "event";
  isLoading: boolean;
  isError: boolean;
  data: any;
  tags: any;
  description: string;
}

export const DetailPage: React.FC<DetailPageProps> = (props) => {
  const styles = useStyles(props.type);
  const { h2, h3, h6, bodyNormal } = useTypographyStyles();
  const { t } = useTranslation();
  return (
    <>
      <ScreenWrapper>
        {props.isError ? (
          <P style={bodyNormal}>There was an error getting announcement</P>
        ) : null}
        {!props.isError && !props.isLoading && props.data ? (
          <View style={styles.wrapper}>
            {props.type === "event" && (
              <Image
                style={styles.mainPoster}
                contentFit="cover"
                source={
                  baseUrl.replace("/api", "") +
                  props.data?.attributes?.Poster?.data[0].attributes?.url
                }
              />
            )}
            <View style={styles.headerSection}>
              <View style={styles.tags}>
                <Tag type={props.type} text={t(`post.type.${props.type}`)} />
                <Tag
                  text={props.data?.attributes.HostingGroup.data.attributes.Name}
                />
              </View>
              <H2 style={[h2]}>{props.data?.attributes?.Title}</H2>
              <View style={styles.dateSection}>
                <H6 style={[h6, styles.date]}>
                  {t(`details.postedDate`)}
                  {moment(props.data?.attributes?.publishedAt).format(
                    "MMM DD, YYYY",
                  )}
                </H6>
              </View>
            </View>
            {props.type === "event" && (
              <EventDetails
                StartDate={props?.data?.attributes?.StartDate}
                EndDate={props?.data?.attributes?.EndDate}
                Location={props?.data?.attributes?.Location}
                Fee={props?.data?.attributes?.Fee}
              />
            )}
            <View style={styles.mainSection}>
              {props.type === "event" && (
                <H3 style={[h3, styles.eventSubtitle]}>Event Description</H3>
              )}
              <RichText content={props.data?.attributes?.Description} />
              <View style={styles.buttonSection}>
                {props.data?.attributes?.Link?.map(
                  (link: CommonLinkComponent) => (
                    <Button
                      type={ButtonTypes.default}
                      text={link.Label}
                      url={link.URL}
                    />
                  ),
                )}
              </View>
            </View>
            {props.type === "event" && (
              <View style={styles.mainSection}>
                <H3 style={[h3, styles.eventSubtitle]}>
                  Event Organizer Details
              </H3>
                <P style={bodyNormal}>{props.data?.attributes?.Contact}</P>
              </View>
            )}
            {props.data?.attributes?.Poster?.data && (
              <View style={styles.gallerySection}>
                <H3 style={[h3, styles.galleryTitle]}>Posters</H3>
                <Gallery data={props.data?.attributes?.Poster?.data} />
              </View>
            )}
            {props.data?.attributes?.Picture?.data && (
              <View style={styles.gallerySection}>
                <H3 style={[h3, styles.galleryTitle]}>Pictures</H3>
                <Gallery data={props.data?.attributes?.Picture?.data} />
              </View>
            )}
          </View>
        ) : (
            <View>
              <P style={bodyNormal}>Still loading</P>
            </View>
          )}

      </ScreenWrapper>
      <FloatingBar />
    </>
  );
};

const useStyles = (type: string) => {
  return StyleSheet.create({
    wrapper: {
      width: "100%",
      maxWidth: type === "event" ? 906 : 672,
      marginBottom: type === "event" ? 140 : 40,
      alignItems: "center",
      marginTop: type === "announcement" ? 16 : 0,
    },
    headerSection: {
      marginBottom: 40,
      maxWidth: 674,
      width: "100%",
      paddingHorizontal: 32,
      marginTop: 40,
    },
    tags: {
      flexDirection: "row",
    },
    dateSection: {
      marginTop: 24,
    },
    date: {
      color: theme.colors.dark,
    },
    mainSection: {
      marginBottom: 48,
      paddingHorizontal: 32,
      width: "100%",
      maxWidth: 674,
    },
    gallerySection: {
      marginBottom: 48,
      width: "100%",
      maxWidth: 674,
    },
    buttonSection: {
      marginTop: 16,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    eventSubtitle: {
      marginBottom: 24,
    },
    galleryTitle: {
      marginBottom: 24,
      paddingHorizontal: 32,
    },
    mainPoster: {
      width: "100%",
      height: "100%",
      maxWidth: 906,
      maxHeight: 338,
      minHeight: 240,
      alignSelf: "center",
    },
  });
};
