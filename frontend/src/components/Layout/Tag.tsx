import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { theme } from "@/config/theme";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";

interface TagProps {
  text?: string;
}

export const Tag: React.FC<TagProps> = ({ text }) => {
  const styles = useStyles();
  const { tag } = useTypographyStyles();

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={tag}>{text}</Text>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.tag.group,
      justifyContent: "center",
      paddingHorizontal: 8,
      paddingVertical: 4,
      width: "auto",
      borderRadius: 5,
      marginBottom: 16,
    },
  });
};
