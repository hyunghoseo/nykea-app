import {
  Code,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Q,
  Span,
  Strong,
} from "@expo/html-elements";
import { Link } from "@react-navigation/native";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/config/theme";
import { useLocale } from "@/contexts/LocaleProvider";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";

interface RichTextProps {
  content?: any;
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  const { locale } = useLocale();
  const { h1, h2, h3, h4, h5, h6, bodyNormal, link, i, code, quote } =
    useTypographyStyles();
  const titleColor = theme.colors.primary[0];
  const styles = useStyles(locale);

  return (
    <View>
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => <P style={bodyNormal}>{children}</P>,
          list: ({ children, format }) => {
            switch (format) {
              case "ordered":
                return <View style={styles.listContainer}>{children}</View>;
              case "unordered":
                return <View style={styles.listContainer}>{children}</View>;
            }
          },
          "list-item": ({ children }) => (
            <View style={styles.listItem}>
              <Text style={[bodyNormal, styles.bulletPoint]}>•</Text>
              <View style={styles.listItemContent}>
                <P style={bodyNormal}>{children}</P>
              </View>
            </View>
          ),
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return <H1 style={[h1, { color: titleColor }]}>{children}</H1>;
              case 2:
                return <H2 style={[h2, { color: titleColor }]}>{children}</H2>;
              case 3:
                return <H3 style={[h3, { color: titleColor }]}>{children}</H3>;
              case 4:
                return <H4 style={[h4, { color: titleColor }]}>{children}</H4>;
              case 5:
                return <H5 style={[h5, { color: titleColor }]}>{children}</H5>;
              case 6:
                return <H6 style={[h6, { color: titleColor }]}>{children}</H6>;
              default:
                return <H1 style={[h1, { color: titleColor }]}>{children}</H1>;
            }
          },
          code: ({ children }) => <Code style={code}>{children}</Code>,
          quote: ({ children }) => <Q style={quote}>{children}</Q>,
          link: ({ children, url }) => (
            <Link style={link} to={url}>
              {children}
            </Link>
          ),
        }}
        modifiers={{
          bold: ({ children }) => (
            <Strong style={styles.bold}>{children}</Strong>
          ),
          italic: ({ children }) => <Span style={i}>{children}</Span>,
        }}
      />
    </View>
  );
};

const useStyles = (locale: string) => {
  return StyleSheet.create({
    bold: {
      fontFamily:
        locale === "ko" ? "NotoSansKR_600SemiBold" : "NotoSans_600SemiBold",
    },
    listContainer: {
      marginVertical: 8,
    },
    listItem: {
      flexDirection: "row",
      marginBottom: 4,
      alignItems: "flex-start",
    },
    bulletPoint: {
      marginRight: 8,
      marginTop: 4,
      lineHeight: 24,
    },
    listItemContent: {
      flex: 1,
    },
  });
};
