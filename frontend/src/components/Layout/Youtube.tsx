import { useState } from "react";
import getVideoId from "get-video-id";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

interface YoutubeProps {
  url: string;
}
export const Youtube: React.FC<YoutubeProps> = ({ url }) => {
  const [width, setWidth] = useState(0);
  const { id } = getVideoId(url);

  return (
    <View
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
      }}
    >
      <YoutubePlayer height={(width / 16) * 9} videoId={id} />
    </View>
  );
};
