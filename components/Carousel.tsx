import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

type AutoplayCarouselProps = {
  data: ImageSourcePropType[];
  height?: number;
  autoPlayInterval?: number;
  loop?: boolean;
  showDots?: boolean;
};

export default function AutoplayCarousel({
  data = [],
  height = 200,
  autoPlayInterval = 3000,
  loop = true,
  showDots = true,
}: AutoplayCarouselProps) {
  const flatListRef = useRef<FlatList<ImageSourcePropType>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const isTouched = useRef(false);

  const itemCount = data.length;

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [currentIndex, itemCount]);

  const startAutoPlay = () => {
    if (timer.current || itemCount <= 1) return;
    timer.current = setInterval(() => {
      if (!isTouched.current) goToNext();
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const goTo = (index: number) => {
    if (!flatListRef.current) return;
    flatListRef.current.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const goToNext = () => {
    let next = currentIndex + 1;
    if (next >= itemCount) {
      if (loop) next = 0;
      else return stopAutoPlay();
    }
    goTo(next);
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index?: number }> }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleTouchStart = () => {
    isTouched.current = true;
    stopAutoPlay();
  };

  const handleTouchEnd = () => {
    isTouched.current = false;
    setTimeout(() => startAutoPlay(), 2000);
  };

  if (!data || data.length === 0) {
    return (
      <View style={[styles.emptyContainer, { height }]}>
        <Text>No images</Text>
      </View>
    );
  }

  return (
    <View style={{ height }}>
      <TouchableWithoutFeedback
        onPressIn={handleTouchStart}
        onPressOut={handleTouchEnd}
      >
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <Image
              source={item}
              style={[styles.image, { width: screenWidth, height }]}
              resizeMode="cover"
            />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </TouchableWithoutFeedback>

      {showDots && (
        <View style={styles.dotsContainer} pointerEvents="none">
          {data.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex ? styles.dotActive : null]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: "#eee",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "white",
    transform: [{ scale: 1.2 }],
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
