import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import ReanimatedCarousel from "react-native-reanimated-carousel";

import { theme } from "@/config/theme";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export interface CarouselSlide {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
  onButtonPress: () => void;
}

interface CarouselProps {
  slides: CarouselSlide[];
  height?: number;
  maxImageWidth?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  height = 300,
  maxImageWidth = 800,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width,
  );
  const carouselRef = useRef<any>(null);
  const { isWeb } = useResponsiveLayout();

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: CarouselSlide;
    index: number;
  }) => {
    const imageWidth = Math.min(screenWidth, maxImageWidth);

    return (
      <View style={styles.slide}>
        {/* Full-width blurred background */}
        <ImageBackground
          source={{ uri: item.backgroundImage }}
          style={styles.blurredBackground}
          imageStyle={styles.blurredBackgroundImageStyle}
        >
          <View style={styles.blurredOverlay} />
        </ImageBackground>

        {/* Main image container */}
        <View style={[styles.imageContainer, { width: imageWidth }]}>
          <ImageBackground
            source={{ uri: item.backgroundImage }}
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImageStyle}
          >
            <View style={styles.overlay}>
              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={item.onButtonPress}
                >
                  <Text style={styles.buttonText}>{item.buttonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  };

  const goToSlide = (index: number) => {
    carouselRef.current?.scrollTo({ index, animated: true });
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
  };

  return (
    <View style={[styles.container, { height }]}>
      <ReanimatedCarousel
        ref={carouselRef}
        width={screenWidth}
        height={height}
        data={slides}
        renderItem={renderItem}
        onSnapToItem={(index) => setCurrentIndex(index)}
        autoPlay
        autoPlayInterval={6000}
        loop
        onConfigurePanGesture={(panGesture) =>
          panGesture.activeOffsetY([-999999, 999999]).activeOffsetX([-20, 20])
        }
      />

      {/* Navigation Arrows - Web only */}
      {isWeb && (
        <>
          <TouchableOpacity
            style={[styles.arrow, styles.leftArrow]}
            onPress={goToPrevious}
          >
            <Icon
              name="chevron-left"
              type="feather"
              size={24}
              color={theme.colors.primary[0]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.arrow, styles.rightArrow]}
            onPress={goToNext}
          >
            <Icon
              name="chevron-right"
              type="feather"
              size={24}
              color={theme.colors.primary[0]}
            />
          </TouchableOpacity>
        </>
      )}

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  slide: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  blurredBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.2 }], // Scale up more to ensure full coverage
  },
  blurredBackgroundImageStyle: {
    resizeMode: "cover",
    // Use CSS filter for web platforms
    ...Platform.select({
      web: {
        filter: "blur(8px)",
      },
    }),
  },
  blurredOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  imageContainer: {
    height: "100%",
    alignSelf: "center",
    zIndex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImageStyle: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    maxWidth: "90%",
  },
  title: {
    fontFamily: "KumbhSans_600SemiBold",
    fontSize: 48,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontFamily: "NotoSans_400Regular",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: theme.colors.primary[0],
    fontFamily: "KumbhSans_500Medium",
    fontSize: 16,
  },
  pagination: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "white",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  leftArrow: {
    left: 16,
  },
  rightArrow: {
    right: 16,
  },
});

export default Carousel;
