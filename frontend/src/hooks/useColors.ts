import { theme } from "@/config/theme";

export const useTagColor = (type: string) => {
  type = type?.toLowerCase();
  let color = theme.colors.tag.group;
  if (type === "announcement") {
    color = theme.colors.tag.announcement;
  } else if (type === "event") {
    color = theme.colors.tag.event;
  }
  return color;
};
