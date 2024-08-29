import { View, StyleSheet } from "react-native"
import { Image } from "expo-image";
import { baseUrl } from "@/api/apiFetcher";
import AutoHeightImage from 'react-native-auto-height-image';
import { SimpleGrid } from "react-native-super-grid";

interface GalleryProps {
    data: {
        attributes: {
            url: string
        },
        id: number,
    }[];
}

export const Gallery: React.FC<GalleryProps> = ({
    data
}) => {
    const styles = useStyles();
    const cnt = data.length;
    return (
        <View style={styles.container}>
            {cnt < 4 &&
                <Image
                    style={styles.image}
                    source={baseUrl.replace("/api", "") + data[0].attributes?.url}
                    contentFit={"fill"}
                />
            }
            {cnt == 2 &&
                <View style={styles.hcontainer}>
                    <Image
                        style={styles.image}
                        source={baseUrl.replace("/api", "") + data[1].attributes?.url}
                        contentFit={"fill"}
                    />
                </View>
            }
            {cnt == 3 &&
                <View style={styles.hcontainer}>
                    <Image
                        style={styles.image}
                        source={baseUrl.replace("/api", "") + data[1].attributes?.url}
                        contentFit={"fill"}
                    />
                    <View
                        style={styles.hmargin}
                    />
                    <Image
                        style={styles.image}
                        source={baseUrl.replace("/api", "") + data[2].attributes?.url}
                        contentFit={"fill"}
                    />
                </View>
            }
            {cnt == 4 &&
                <View>
                    <View style={styles.hcontainer}>
                        <Image
                            style={styles.image}
                            source={baseUrl.replace("/api", "") + data[0].attributes?.url}
                            contentFit={"fill"}
                        />
                        <View
                            style={styles.hmargin}
                        />
                        <Image
                            style={styles.image}
                            source={baseUrl.replace("/api", "") + data[1].attributes?.url}
                            contentFit={"fill"}
                        />
                    </View>
                    <View style={styles.hcontainer}>
                        <Image
                            style={styles.image}
                            source={baseUrl.replace("/api", "") + data[2].attributes?.url}
                            contentFit={"fill"}
                        />
                        <View
                            style={styles.hmargin}
                        />
                        <Image
                            style={styles.image}
                            source={baseUrl.replace("/api", "") + data[3].attributes?.url}
                            contentFit={"fill"}
                        />
                    </View>
                </View>
            }
            {cnt > 4 &&
                <SimpleGrid
                    data={data}
                    key={2}
                    listKey={2 + ""}
                    maxItemsPerRow={4}
                    renderItem={({ item, index }) =>
                        item.attributes ? (
                            <Image
                                style={styles.image}
                                source={baseUrl.replace("/api", "") + data[index].attributes?.url}
                                contentFit={"fill"}
                            />
                        ) : null
                    }
                    spacing={16}
                />
            }
        </View>
    )
}

const useStyles = (type: any) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column'
        },
        hcontainer: {
            flexDirection: 'row',
            marginTop: 16,
        },
        image: {
            resizeMode: 'contain',
            flex: 1,
            aspectRatio: 1,
        },
        hmargin: {
            width: 16,
        }
    });
};
