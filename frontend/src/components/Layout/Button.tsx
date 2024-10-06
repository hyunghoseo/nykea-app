import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { theme } from "@/config/theme";

export enum ButtonTypes {
  default,
  share,
  location,
}

interface ButtonProps {
  text?: string;
  type?: ButtonTypes;
  url?: string;
}
export const Button: React.FC<ButtonProps> = ({
  text = undefined,
  type = ButtonTypes.default,
  url = "",
}) => {
  const styles = useStyles(type);
  const { buttonLarge, bodySmall } = useTypographyStyles();
  const buttonTextStyle = type === ButtonTypes.default ? buttonLarge : bodySmall;

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={async () => await Linking.openURL(url)}
    >
      <Text style={[styles.text, buttonTextStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const useStyles = (type: ButtonTypes) => {
  if (type === ButtonTypes.default) {
    return StyleSheet.create({
      container: {
        backgroundColor: "#225DA7",
        borderRadius: 30,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        paddingHorizontal: 24,
        marginRight: 16,
        marginTop: 16,
      },
      text: {
        color: "#ffffff",
      },
    });
  } else if (type === ButtonTypes.location) {
    return StyleSheet.create({
      container: {
        borderRadius: 30,
        flexDirection: "row",
        alignSelf: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderColor: theme.colors.dark,
        borderWidth: 1,
        marginRight: 16,
        width: "auto",
        marginVertical: 8,

      },
      text: {
        color: "#ffffff",
      },
    });
  } else {
    return StyleSheet.create({
      container: {},
      text: {},
    });
  }
};
