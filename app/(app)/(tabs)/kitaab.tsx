import AutoplayCarousel from "@/components/Carousel";
import { APP_COLORS } from "@/constants/Colors";
import { scale, verticalScale } from "@/constants/metrics";
import useKitaab from "@/layouts/App/Kitaab/KitaabContainer";
import image1 from "@assets/images/carouselImgs/1.jpg";
import image2 from "@assets/images/carouselImgs/2.jpg";
import image3 from "@assets/images/carouselImgs/3.jpg";
import image4 from "@assets/images/carouselImgs/4.jpg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Kitaab() {
  const { isLoading, totals } = useKitaab();
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Kitaab</Text>
      </View>
      <AutoplayCarousel data={[image4, image3, image1, image2]} />
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View>
            <Text style={styles.deeds}>Deeds & Summary</Text>
            <Text style={styles.subtitle}>Track your sawab & gunah</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.sawabGunahContainer}>
              <Text style={styles.sawabGunahTitle}>{totals?.sawab}</Text>
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
              <Text
                style={[styles.sawabGunahTitle, { color: APP_COLORS.text }]}
              >
                {totals?.gunah}
              </Text>
              <Text style={[styles.subtitle, { color: APP_COLORS.lightText }]}>
                Gunah
              </Text>
            </View>
          </View>

          <Text style={styles.sawabGained}>
            You gained {totals?.todaySawab} Sawab today
          </Text>
        </View>

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigate("/(app)/add_record")}
        >
          <MaterialCommunityIcons name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

// ✨ Same styles from your Kitaab theme (unchanged)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 24 },
  floatingButton: {
    backgroundColor: APP_COLORS.primary,
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 20,
  },
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
  header: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: APP_COLORS.text,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "light",
    textAlign: "left",
    color: APP_COLORS.lightText,
  },
});
