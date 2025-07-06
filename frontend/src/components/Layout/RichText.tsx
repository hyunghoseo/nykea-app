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
  UL,
} from "@expo/html-elements";
import { Link } from "@react-navigation/native";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { View } from "react-native";

import { theme } from "@/config/theme";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";

interface RichTextProps {
  content?: any;
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  const { h1, h2, h3, h4, h5, h6, bodyNormal, link, i, code, quote } =
    useTypographyStyles();
  const titleColor = theme.colors.primary[0];
  return (
    <View>
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => <P style={bodyNormal}>{children}</P>,
          list: ({ children, format }) => {
            switch (format) {
              case "ordered":
                return <P style={bodyNormal}>{children}</P>;
              case "unordered":
                return <UL style={bodyNormal}>{children}</UL>;
            }
          },
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
          bold: ({ children }) => <Strong>{children}</Strong>,
          italic: ({ children }) => <Span style={i}>{children}</Span>,
        }}
      />
    </View>
  );
};
