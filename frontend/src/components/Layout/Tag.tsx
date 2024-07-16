import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useTagColor } from "@/hooks/useColors";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";

interface TagProps {
  text?: string;
  type?: string;
}

export const Tag: React.FC<TagProps> = ({ text, type = undefined }) => {
  const styles = useStyles(type);
  const { tag } = useTypographyStyles();

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={tag}>{text}</Text>
    </TouchableOpacity>
  );
};

const useStyles = (type: any) => {
  const color = useTagColor(type);
  return StyleSheet.create({
    container: {
      backgroundColor: color,
      justifyContent: "center",
      paddingHorizontal: 8,
      paddingVertical: 4,
      width: "auto",
      borderRadius: 5,
      marginBottom: 16,
      marginRight: 12,
    },
  });
};
