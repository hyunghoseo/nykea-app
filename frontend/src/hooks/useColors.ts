import { theme } from "@/config/theme";

export const useTagColor = (type: string) => {
  type = type?.toLowerCase();
  let color = theme.colors.tag.group;
  if (type === "announcement") {
    color = theme.colors.tag.announcement;
  } else if (type === "event") {
    color = theme.colors.tag.event;
  } else if (type.includes("service")) {
    color = theme.colors.tag[type as keyof typeof theme.colors.tag];
  }
  return color;
};
