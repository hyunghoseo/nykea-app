import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { SimpleGrid } from "react-native-super-grid";

import { baseUrl } from "@/api/apiFetcher";

interface GalleryProps {
  data: {
    attributes: {
      url: string;
    };
    id: number;
  }[];
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const styles = useStyles();
  const cnt = data.length;
  return (
    <View style={styles.container}>
      {cnt < 4 && (
        <Image
          style={styles.image}
          source={baseUrl.replace("/api", "") + data[0].attributes?.url}
          contentFit="fill"
        />
      )}
      {cnt === 2 && (
        <View style={styles.hcontainer}>
          <Image
            style={styles.image}
            source={baseUrl.replace("/api", "") + data[1].attributes?.url}
            contentFit="fill"
          />
        </View>
      )}
      {cnt === 3 && (
        <View style={styles.hcontainer}>
          <Image
            style={styles.image}
            source={baseUrl.replace("/api", "") + data[1].attributes?.url}
            contentFit="fill"
          />
          <View style={styles.hmargin} />
          <Image
            style={styles.image}
            source={baseUrl.replace("/api", "") + data[2].attributes?.url}
            contentFit="fill"
          />
        </View>
      )}
      {cnt === 4 && (
        <View>
          <View style={styles.hcontainer}>
            <Image
              style={styles.image}
              source={baseUrl.replace("/api", "") + data[0].attributes?.url}
              contentFit="fill"
            />
            <View style={styles.hmargin} />
            <Image
              style={styles.image}
              source={baseUrl.replace("/api", "") + data[1].attributes?.url}
              contentFit="fill"
            />
          </View>
          <View style={styles.hcontainer}>
            <Image
              style={styles.image}
              source={baseUrl.replace("/api", "") + data[2].attributes?.url}
              contentFit="fill"
            />
            <View style={styles.hmargin} />
            <Image
              style={styles.image}
              source={baseUrl.replace("/api", "") + data[3].attributes?.url}
              contentFit="fill"
            />
          </View>
        </View>
      )}
      {cnt > 4 && (
        <SimpleGrid
          style={styles.grid}
          data={data}
          key={2}
          listKey={2 + ""}
          maxItemsPerRow={4}
          renderItem={({ item, index }) =>
            item.attributes ? (
              <Image
                style={styles.image}
                source={
                  baseUrl.replace("/api", "") + data[index].attributes?.url
                }
                contentFit="fill"
              />
            ) : null
          }
          spacing={0}
        />
      )}
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: "column",
    },
    hcontainer: {
      flexDirection: "row",
      marginTop: 16,
    },
    image: {
      resizeMode: "contain",
      flex: 1,
      aspectRatio: 1,
      margin: 5,
    },
    hmargin: {
      width: 16,
    },
    grid: {
      padding: 0,
    },
  });
};
