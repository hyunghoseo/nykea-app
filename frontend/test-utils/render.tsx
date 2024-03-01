import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as testingLibraryRender } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LocaleProvider } from "@/contexts/LocaleProvider";
import { NavigationProvider } from "@/contexts/NavigationProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <LocaleProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <NavigationProvider>{children}</NavigationProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </LocaleProvider>
    ),
  });
}
