import { StyleSheet } from "react-native";
import { SimpleGrid } from "react-native-super-grid";

import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { AnnouncementListResponseDataItem } from "@/api/apiSchemas";

import { AnnouncementCard } from "./AnnouncementCard";

interface AnnouncementListProps {
  isLoading: boolean;
  announcements?: AnnouncementListResponseDataItem[];
}

export const AnnouncementList: React.FC<AnnouncementListProps> = ({
  isLoading,
  announcements,
}) => {
  const styles = useStyles();

  const { isMobile, isTablet } = useResponsiveLayout();
  const numColumns = isMobile ? 1 : isTablet ? 1 : 2;

  return !isLoading && announcements ? (
    <SimpleGrid
      data={announcements}
      key={numColumns}
      listKey={numColumns + ""}
      maxItemsPerRow={numColumns}
      renderItem={({ item }) =>
        item.attributes ? (
          <AnnouncementCard id={item.id} {...item.attributes} />
        ) : null
      }
      style={styles.list}
      spacing={isMobile ? 24 : 32}
    />
  ) : (
    <SimpleGrid
      data={Array(numColumns).fill(true)}
      key={numColumns + "placeholder"}
      listKey={numColumns + ""}
      maxItemsPerRow={numColumns}
      renderItem={({ index }) => <AnnouncementCard key={index} isLoading />}
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
