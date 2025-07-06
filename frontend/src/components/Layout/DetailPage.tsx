import { H2, H3, H6, P } from "@expo/html-elements";
import { Image } from "expo-image";
import moment from "moment";
import { StyleSheet, View } from "react-native";

import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { Announcement, CommonLinkComponent, Event } from "@/api/apiSchemas";

import ScreenWrapper from "../ScreenWrapper";
import { Button, ButtonTypes } from "./Button";
import { EventDetails } from "./Event/EventDetails";
import { Gallery } from "./Gallery";
import { RichText } from "./RichText";
import { Tag } from "./Tag";

type BaseDetailPageProps = {
  isLoading: boolean;
  isError: boolean;
};

type AnnouncementProps = BaseDetailPageProps & {
  type: "announcement";
  data?: Announcement;
};

type EventProps = BaseDetailPageProps & {
  type: "event";
  data?: Event;
};

type DetailPageProps = AnnouncementProps | EventProps;

export const DetailPage: React.FC<DetailPageProps> = ({
  type,
  data,
  isLoading,
  isError,
}) => {
  const styles = useStyles(type);
  const { h2, h3, h6, bodyNormal } = useTypographyStyles();
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <ScreenWrapper noVerticalPadding>
      {isError ? (
        <P style={bodyNormal}>There was an error getting announcement</P>
      ) : null}
      {!isError && !isLoading && data ? (
        <View style={styles.wrapper}>
          {type === "event" && (
            <Image
              style={styles.mainPoster}
              contentFit="cover"
              source={data?.Poster?.data?.[0]?.attributes?.url}
            />
          )}
          <View style={styles.headerSection}>
            <View style={styles.tags}>
              <Tag type={type} text={t(`post.type.${type}`)} />
              {data?.HostingGroup?.data?.attributes?.Name ? (
                <Tag text={data?.HostingGroup?.data?.attributes?.Name} />
              ) : null}
            </View>
            <H2 style={[h2]}>{data?.Title}</H2>
            <View style={styles.dateSection}>
              <H6 style={[h6, styles.date]}>
                {t(`details.postedDate`)}
                {moment(data?.publishedAt).locale(locale).format("llll")}
              </H6>
            </View>
          </View>
          {type === "event" && (
            <EventDetails
              StartDate={data?.StartDate}
              EndDate={data?.EndDate}
              Location={data?.Location}
              Fee={data?.Fee}
            />
          )}
          <View style={styles.mainSection}>
            {type === "event" && (
              <H3 style={[h3, styles.eventSubtitle]}>Event Description</H3>
            )}
            <RichText content={data?.Description} />
            {type === "announcement" && (
              <View style={styles.buttonSection}>
                {data?.Link?.map((link: CommonLinkComponent) => (
                  <Button
                    type={ButtonTypes.default}
                    text={link.Label}
                    url={link.URL}
                  />
                ))}
              </View>
            )}
          </View>
          {type === "event" && (
            <View style={styles.mainSection}>
              <H3 style={[h3, styles.eventSubtitle]}>
                Event Organizer Details
              </H3>
              <P style={bodyNormal}>{data?.Contact}</P>
            </View>
          )}
          {data?.Poster?.data && (
            <View style={styles.gallerySection}>
              <H3 style={[h3, styles.galleryTitle]}>Posters</H3>
              <Gallery data={data?.Poster?.data} />
            </View>
          )}
          {type === "event" && data?.Picture?.data && (
            <View style={styles.gallerySection}>
              <H3 style={[h3, styles.galleryTitle]}>Pictures</H3>
              <Gallery data={data?.Picture?.data} />
            </View>
          )}
        </View>
      ) : (
        <View>
          <P style={bodyNormal}>Still loading</P>
        </View>
      )}
    </ScreenWrapper>
  );
};

const useStyles = (type: string) => {
  return StyleSheet.create({
    wrapper: {
      width: "100%",
      maxWidth: type === "event" ? 906 : 672,
      marginBottom: 40,
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
