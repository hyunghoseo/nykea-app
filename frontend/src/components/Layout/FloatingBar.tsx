import { StyleSheet, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

interface FloatingBarProps {
  test: string;
}

export const FloatingBar: React.FC<FloatingBarProps> = (props) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Shadow endColor="#86868600" startColor="#8686861a" distance={15}>
        <View style={styles.subContainer}>
          <Text style={styles.contents}>hello world</Text>
        </View>
      </Shadow>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 96,
      marginTop: 20,
      backgroundColor: "#ffffff",
    },
    subContainer: {
      width: "100%",
      maxWidth: 906,
      height: 96,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "f2f222",
      alignContent: "center",
    },
    contents: {
      backgroundColor: "#ffffff",
    },
  });
};
