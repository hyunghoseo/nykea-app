import { H2, H6, P } from "@expo/html-elements";
import { StyleSheet, View } from "react-native";

import { theme } from "@/config/theme";
import { useTypographyStyles } from "@/hooks/useTypographyStyles";

import ScreenWrapper from "../ScreenWrapper";
import { Tag } from "./Tag";

interface DetailPageProps {
  type: string;
  isLoading: boolean;
  isError: boolean;
  data: any;
  title: string;
  tag1: string;
  postedDate: string;
  description: string;
}

export const DetailPage: React.FC<DetailPageProps> = (props) => {
  const styles = useStyles();
  const { h2, h6 } = useTypographyStyles();
  return (
    <ScreenWrapper>
      <View>
        <View>
          <View>
            <Tag text={props.tag1} />
            <Tag text={props.tag1} />
          </View>
          <H2 style={[h2]}>{props.title}</H2>
          <H6 style={[h6, styles.date]}>{props.postedDate}</H6>
        </View>
        <View>{props.data}</View>
      </View>
    </ScreenWrapper>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    date: {
      color: theme.colors.dark,
    },
  });
};
