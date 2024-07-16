import { View } from "react-native"
import { H1, H2, H3, H4, H5, H6, P, Strong, Span } from "@expo/html-elements"
import { useTypographyStyles } from "@/hooks/useTypographyStyles"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { Link } from "@react-navigation/native"

interface RichTextProps {
    content?: any;
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
    const { h1, h2, h3, h4, h5, h6, bodyNormal, link, i } = useTypographyStyles();
    return (

        <View>
            <BlocksRenderer
                content={content}
                blocks={{
                    paragraph: ({ children }) => <P style={bodyNormal}>{children}</P>,
                    // list: ({ children, format }) => {
                    //     switch (format) {

                    //     }
                    // },
                    heading: ({ children, level }) => {
                        switch (level) {
                            case 1:
                                return <H1 style={h1}>{children}</H1>
                            case 2:
                                return <H2 style={h2}>{children}</H2>
                            case 3:
                                return <H3 style={h3}>{children}</H3>
                            case 4:
                                return <H4 style={h4}>{children}</H4>
                            case 5:
                                return <H5 style={h5}>{children}</H5>
                            case 6:
                                return <H6 style={h6}>{children}</H6>
                            default:
                                return <H1 style={h1}>{children}</H1>
                        }
                    },
                    link: ({ children, url }) => <Link style={link} to={url}>{children}</Link>
                }}
                modifiers={{
                    bold: ({ children }) => <Strong>{children}</Strong>,
                    italic: ({ children }) => <Span style={i}>{children}</Span>
                }}
            />
        </View >
    )
}