import { APP_COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { goBack } from "expo-router/build/global-state/routing";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  navigation: any;
}

const AboutScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: APP_COLORS.border }]}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={APP_COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>About Us</Text>

        {/* Spacer to balance header */}
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: APP_COLORS.primaryAppBg },
          ]}
        >
          <Ionicons name="book" size={50} color={APP_COLORS.primary} />
        </View>

        <Text style={styles.title}>Our Vision</Text>
        <Text style={styles.paragraph}>
          <Text style={{ color: APP_COLORS.primary, fontWeight: "700" }}>
            Sawab-ki-Kitaab
          </Text>{" "}
          is your digital companion designed to help you stay mindful of your
          daily actions. Inspired by the concept of maintaining a "Book of
          Deeds," our app provides a private space to record your good deeds (
          <Text style={{ color: APP_COLORS.primary, fontWeight: "bold" }}>
            Sawab
          </Text>
          ) and identify areas for improvement (
          <Text style={{ color: APP_COLORS.logoutText, fontWeight: "bold" }}>
            Gunah
          </Text>
          ).
        </Text>

        <Text style={styles.title}>Key Features</Text>

        <View style={styles.listItem}>
          <Ionicons name="sparkles" size={20} color={APP_COLORS.primary} />
          <Text style={styles.listText}>
            <Text style={styles.boldText}>Build Consistency:</Text> Log your
            good deeds daily to form positive habits.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Ionicons
            name="chatbubble-ellipses"
            size={20}
            color={APP_COLORS.primary}
          />
          <Text style={styles.listText}>
            <Text style={styles.boldText}>Self-Reflection:</Text> Use the Notes
            feature to reflect on your daily actions.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Ionicons
            name="shield-checkmark"
            size={20}
            color={APP_COLORS.primary}
          />
          <Text style={styles.listText}>
            <Text style={styles.boldText}>Privacy First:</Text> Your spiritual
            journey is private and securely stored only for you.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: APP_COLORS.text,
  },

  backButton: { padding: 8 },

  contentContainer: { padding: 24 },

  iconContainer: {
    alignSelf: "center",
    padding: 20,
    borderRadius: 25,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: APP_COLORS.text,
    marginTop: 20,
    marginBottom: 12,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: APP_COLORS.text,
    marginBottom: 10,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  listText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: APP_COLORS.text,
    lineHeight: 22,
  },

  boldText: {
    fontWeight: "700",
    color: APP_COLORS.text,
  },
});

export default AboutScreen;
