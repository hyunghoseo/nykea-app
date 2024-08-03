import YoutubePlayer from "react-native-youtube-iframe";
import { View } from "react-native";
import { useState } from "react";

interface YoutubeProps {
    url?: string;
    id?: string;
}
export const Youtube: React.FC<YoutubeProps> = ({
    url,
    id
}) => {
    const [width, setWidth] = useState(0);

    return (
        <View
            onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setWidth(width);
            }}
        >
            <YoutubePlayer
                height={(width / 16) * 9}
                videoId={"BamhalnDSDI"}
            />
        </View>
    );
}