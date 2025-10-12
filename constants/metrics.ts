import { Dimensions } from "react-native";

// Base dimensions for scaling (you can adjust these based on your design)
const guidelineBaseWidth = 430;
const guidelineBaseHeight = 932;

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Create scale function
export const scale = (size: number) =>
  (screenWidth / guidelineBaseWidth) * size;

// Create verticalScale function
export const verticalScale = (size: number) =>
  (screenHeight / guidelineBaseHeight) * size;
