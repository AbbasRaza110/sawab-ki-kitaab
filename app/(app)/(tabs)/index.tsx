import AutoplayCarousel from "@/components/Carousel";
import CounterInput from "@/components/InputCounter/InputCounter";
import { APP_COLORS } from "@/constants/Colors";
import { scale, verticalScale } from "@/constants/metrics";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import img1 from "../../../assets/images/carouselImgs/img1.jpg";
import img2 from "../../../assets/images/carouselImgs/img2.jpg";
import img3 from "../../../assets/images/carouselImgs/img3.jpg";

export default function Kitaab() {
  const [sawabCount, setSawabCount] = useState(0);
  const [gunahCount, setGunahCount] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sawab Ki Kitaab</Text>
      </View>
      <View style={styles.line} />

      <AutoplayCarousel autoPlayInterval={2000} data={[img1, img2, img3]} />

      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.deeds}>Deeds & Summary</Text>
          <Text style={styles.subtitle}>Track your sawab & gunah</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={styles.sawabGunahContainer}>
            <Text style={styles.sawabGunahTitle}>{sawabCount}</Text>
            <Text style={[styles.subtitle, { color: APP_COLORS.lightText }]}>
              Sawab
            </Text>
          </View>
          <View
            style={[
              styles.sawabGunahContainer,
              { backgroundColor: APP_COLORS.logoutBg },
            ]}
          >
            <Text style={[styles.sawabGunahTitle, { color: APP_COLORS.text }]}>
              {gunahCount}
            </Text>
            <Text style={[styles.subtitle, { color: APP_COLORS.lightText }]}>
              Gunah
            </Text>
          </View>
        </View>
        <View>
          <CounterInput
            title="Add Sawab"
            count={sawabCount}
            setCount={setSawabCount}
          />
          <CounterInput
            title="Add Gunah"
            addBg={APP_COLORS.background2}
            count={gunahCount}
            setCount={setGunahCount}
          />
        </View>
        <Text style={styles.sawabGained}>You gained 10 Sawab today</Text>
      </View>
    </View>
  );
}

// ✨ Same styles from your Kitaab theme (unchanged)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 24 },
  sawabGained: {
    fontSize: 14,
    fontWeight: "semibold",
    color: APP_COLORS.primary,
    textAlign: "center",
  },
  sawabGunahContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.primaryAppBg,
    width: "48%",
    padding: 12,
    borderRadius: 8,
  },
  sawabGunahTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: APP_COLORS.primary,
  },
  cardContainer: {
    paddingVertical: verticalScale(24),
    paddingHorizontal: scale(16),
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Android shadow
    elevation: 2,
    gap: 20,
  },
  deeds: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    color: APP_COLORS.primary,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "light",
    textAlign: "left",
    color: APP_COLORS.lightText,
  },
  header: {
    alignItems: "center",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#E5E7EB",
    opacity: 0.8,
  },
});
