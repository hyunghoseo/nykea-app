import { createContext, ReactNode, useContext, useState } from "react";
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRefWithCurrent,
} from "@react-navigation/native";

import { linking, RootStackParamList } from "@/config/navigation";
import { TranslationEntryKey } from "@/config/translations";
import { useTranslation } from "@/hooks/useTranslation";

interface NavigationContextType {
  currentRoute?: string;
  navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

// Only use this hook outside of Screen context
export const useNavigationRef = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationRef must be used within a NavigationProvider",
    );
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(
    undefined,
  );
  const navigationRef = createNavigationContainerRef<RootStackParamList>();

  const { t } = useTranslation();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setCurrentRoute(navigationRef.getCurrentRoute()?.name);
      }}
      onStateChange={async () => {
        const routeName = navigationRef.getCurrentRoute()?.name;
        setCurrentRoute(routeName);
      }}
      linking={linking}
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "white" },
      }}
      documentTitle={{
        formatter: (options, route) => {
          const pageTitle = t(`nav.${route?.name}` as TranslationEntryKey);
          return pageTitle ? `${pageTitle} - ${t("home")}` : t("home");
        },
      }}
    >
      <NavigationContext.Provider value={{ currentRoute, navigationRef }}>
        {children}
      </NavigationContext.Provider>
    </NavigationContainer>
  );
};
