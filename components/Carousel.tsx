import * as React from "react";
import { Dimensions, Image, ImageSourcePropType, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const screenWidth = Dimensions.get("window").width;

// Define your data type properly
type Props = {
  data: ImageSourcePropType[];
};

function AutoplayCarousel({ data }: Props) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  // 1200x400 calculation
  const finalHeight = 200;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Use absolute index for the scroll to avoid calculation errors
       * when user clicks dots rapidly.
       */
      index,
      animated: true,
    });
  };

  return (
    <View style={{ width: screenWidth, height: finalHeight + 20 }}>
      <Carousel
        ref={ref}
        width={screenWidth}
        height={finalHeight}
        data={data}
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={true}
        autoPlayInterval={3000}
        scrollAnimationDuration={1000}
        // This is key: it maps the carousel progress to your shared value
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <Image
              source={item}
              style={{
                width: screenWidth,
                height: finalHeight,
                borderRadius: 12,
                alignSelf: "center",
              }}
              resizeMode="stretch"
            />
          </View>
        )}
      />

      {/* Pagination component */}
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{
          backgroundColor: "rgba(0,0,0,0.2)",
          width: 8,
          height: 8,
          borderRadius: 4,
        }}
        activeDotStyle={{
          backgroundColor: "#000",
          width: 20, // Professional expanding effect
        }}
        containerStyle={{
          gap: 5,
          marginTop: 10,
          justifyContent: "center",
        }}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default AutoplayCarousel;
