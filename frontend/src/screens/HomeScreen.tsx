import { useEffect, useRef } from "react";
import { Animated, Linking, StyleSheet, Text, View } from "react-native";

import { theme } from "@/config/theme";
import { RichText } from "@/components/Layout/RichText";

import { useGetHomepageInfo } from "../api/apiComponents";
import { baseUrl } from "../api/apiFetcher";
import { ListCarouselSlideComponent } from "../api/apiSchemas";
import Carousel, { CarouselSlide } from "../components/Carousel";
import ScreenWrapper from "../components/ScreenWrapper";
import { RootStackParamList } from "../config/navigation";
import { useLocale } from "../contexts/LocaleProvider";
import { useNavigationRef } from "../contexts/NavigationProvider";

// Helper function to transform API data to CarouselSlide format
const transformApiDataToCarouselSlides = (
  slides: ListCarouselSlideComponent[],
  navigationRef: ReturnType<typeof useNavigationRef>["navigationRef"],
): CarouselSlide[] => {
  return slides.map((slide) => {
    const imageUrl = slide.SlideBackgroundImage?.data?.attributes?.url;
    const fullImageUrl = imageUrl
      ? imageUrl.startsWith("http")
        ? imageUrl
        : `${baseUrl.replace("/api", "")}${imageUrl}`
      : "";

    return {
      id: slide.id?.toString() || "",
      title: slide.SlideTitle || "",
      description: slide.SlideDescription || "",
      buttonText: slide.SlideButtonText || "Learn More",
      backgroundImage: fullImageUrl,
      onButtonPress: () => {
        if (slide.SlideButtonLink) {
          handleNavigation(slide.SlideButtonLink, navigationRef);
        } else {
          console.log(`${slide.SlideButtonText} pressed`);
        }
      },
    };
  });
};

// Helper function to handle navigation
const handleNavigation = (
  link: string,
  navigationRef: ReturnType<typeof useNavigationRef>["navigationRef"],
) => {
  // Check if it's an external URL
  if (link.startsWith("http://") || link.startsWith("https://")) {
    Linking.openURL(link).catch((err) => {
      console.error("Failed to open external URL:", err);
    });
  } else {
    // Handle internal navigation
    // Remove leading slash if present
    const route = link.startsWith("/") ? link.slice(1) : link;

    // Map common route patterns to navigation names
    const routeMapping: Record<string, keyof RootStackParamList> = {
      about: "About",
      groups: "Groups",
      services: "Services",
      events: "Events",
      announcements: "Announcements",
      "contact-us": "ContactUs",
      policy: "Policy",
      "": "Home", // Empty string maps to Home
    };

    const mappedRoute = routeMapping[route];
    if (mappedRoute) {
      navigationRef.navigate(mappedRoute as any);
    } else {
      console.log(`Unknown route: ${route}`);
    }
  }
};

const HomeScreen = () => {
  const { navigationRef } = useNavigationRef();
  const { locale } = useLocale();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const styles = useStyles(locale);

  const {
    data: homepageInfo,
    isLoading,
    error,
  } = useGetHomepageInfo({
    queryParams: {
      populate: "Slides.SlideBackgroundImage",
      locale,
    },
  });

  const carouselSlides: CarouselSlide[] = homepageInfo?.data?.attributes?.Slides
    ? transformApiDataToCarouselSlides(
        homepageInfo.data.attributes.Slides,
        navigationRef,
      )
    : [];

  // Fade in animation when data is loaded
  useEffect(() => {
    if (!isLoading && (homepageInfo || error)) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, homepageInfo, error, fadeAnim]);

  // Show loading screen (empty) while loading
  if (isLoading) {
    return (
      <ScreenWrapper noVerticalPadding>
        <View style={styles.loadingContainer} />
        <View style={styles.loadingTextContainer}>
          <View style={styles.loadingTitlePlaceholder} />
          <View style={styles.loadingDescriptionPlaceholder} />
        </View>
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
          <View style={styles.errorInnerContainer}>
            <Text>Error loading homepage information</Text>
          </View>
        </Animated.View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper noVerticalPadding>
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        {carouselSlides.length > 0 ? (
          <Carousel slides={carouselSlides} height={480} maxImageWidth={1440} />
        ) : (
          <View style={styles.noSlidesContainer}>
            <Text>No slides available</Text>
          </View>
        )}
        <View style={styles.mainMessageContainer}>
          {homepageInfo?.data?.attributes?.MainMessageTitle && (
            <Text style={styles.mainMessageTitle}>
              {homepageInfo.data.attributes.MainMessageTitle}
            </Text>
          )}
          {homepageInfo?.data?.attributes?.MainMessageRichText ? (
            <View style={styles.mainMessageRichText}>
              <RichText
                content={homepageInfo.data.attributes.MainMessageRichText}
              />
            </View>
          ) : null}
        </View>
      </Animated.View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const useStyles = (locale: string) => {
  return StyleSheet.create({
    loadingContainer: {
      height: 300,
    },
    loadingTextContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    loadingTitlePlaceholder: {
      height: 34,
      marginBottom: 10,
    },
    loadingDescriptionPlaceholder: {
      height: 48,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorInnerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noSlidesContainer: {
      height: 300,
      justifyContent: "center",
      alignItems: "center",
    },
    mainMessageContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      width: "100%",
      maxWidth: 674,
      alignSelf: "center",
    },
    mainMessageTitle: {
      fontSize: 24,
      fontFamily: locale === "ko" ? "NotoSansKR_700Bold" : "NotoSans_700Bold",
      color: theme.colors.primary[0],
      marginBottom: 32,
      textAlign: "center",
    },
    mainMessageRichText: {
      width: "100%",
      alignItems: "flex-start",
    },
    mainMessageDescription: {
      fontSize: 16,
      lineHeight: 24,
    },
  });
};
