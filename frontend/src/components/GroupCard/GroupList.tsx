import { StyleSheet } from "react-native";
import { SimpleGrid } from "react-native-super-grid";

import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { GroupListResponseDataItem } from "@/api/apiSchemas";

import { GroupCard } from "./GroupCard";

interface GroupListProps {
  isLoading: boolean;
  groups?: GroupListResponseDataItem[];
  groupKey: string;
}

export const GroupList: React.FC<GroupListProps> = ({
  isLoading,
  groups,
  groupKey,
}) => {
  const styles = useStyles();

  const { isMobile } = useResponsiveLayout();

  const numColumns = isMobile ? 2 : 4;

  return !isLoading && groups ? (
    <SimpleGrid
      data={groups}
      key={numColumns}
      listKey={numColumns + ""}
      maxItemsPerRow={numColumns}
      renderItem={({ item }) =>
        item.attributes ? <GroupCard {...item.attributes} /> : null
      }
      style={styles.list}
      spacing={isMobile ? 24 : 32}
    />
  ) : (
    <SimpleGrid
      data={Array(4).fill(true)}
      key={numColumns + "placeholder"}
      listKey={numColumns + ""}
      maxItemsPerRow={numColumns}
      renderItem={(rowIndex) => (
        <GroupCard
          key={rowIndex + ""}
          isLoading
          Name="placeholder"
          ShortDescription="placeholder"
        />
      )}
      style={styles.list}
      spacing={isMobile ? 24 : 32}
    />
  );
};

const useStyles = () => {
  const { isMobile } = useResponsiveLayout();

  return StyleSheet.create({
    list: {
      margin: isMobile ? -24 : -32,
    },
  });
};
