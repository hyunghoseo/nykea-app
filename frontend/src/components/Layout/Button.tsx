import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useTypographyStyles } from "@/hooks/useTypographyStyles";

export enum ButtonTypes {
  default,
  share,
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
  const { buttonLarge } = useTypographyStyles();

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={async () => await Linking.openURL(url)}
    >
      <Text style={[styles.text, buttonLarge]}>{text}</Text>
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
  } else {
    return StyleSheet.create({
      container: {},
      text: {},
    });
  }
};
