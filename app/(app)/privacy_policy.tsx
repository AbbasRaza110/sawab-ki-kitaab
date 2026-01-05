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

const PrivacyPolicyScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View
      style={[styles.container, { backgroundColor: APP_COLORS.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: APP_COLORS.border }]}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={APP_COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lastUpdated}>Last Updated: January 2026</Text>

        <Text style={styles.sectionTitle}>1. Data We Collect</Text>
        <Text style={styles.paragraph}>
          We collect your Name, Email, and a hashed version of your password. We
          also store the deeds (Sawab and Gunah) you log, including counts and
          optional notes.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of Information</Text>
        <Text style={styles.paragraph}>
          Your information is used solely to provide your personal deed-tracking
          service. We <Text style={styles.highlight}>never</Text> share your
          spiritual data or personal details with third-party advertisers.
        </Text>

        <Text style={styles.sectionTitle}>3. Security</Text>
        <Text style={styles.paragraph}>
          We use industry-standard encryption to protect your account. Your
          password is encrypted before being stored in our database.
        </Text>

        <Text style={styles.sectionTitle}>4. Account Deletion</Text>
        <Text style={styles.paragraph}>
          You have the right to delete your account and all associated data at
          any time. Please contact our support team to initiate this request.
        </Text>

        <View style={[styles.footer, { borderTopColor: APP_COLORS.border }]}>
          <Text style={styles.footerText}>
            Contact: support@sawabkikitab.com
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

  headerSpacer: { width: 40 },

  contentContainer: { padding: 24 },

  lastUpdated: {
    fontSize: 13,
    marginBottom: 20,
    color: APP_COLORS.lightText,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: APP_COLORS.text,
    marginTop: 15,
    marginBottom: 8,
  },

  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: APP_COLORS.text,
    marginBottom: 15,
  },

  highlight: {
    color: APP_COLORS.primary,
    fontWeight: "700",
  },

  footer: {
    marginTop: 30,
    paddingVertical: 30,
    borderTopWidth: 1,
    alignItems: "center",
  },

  footerText: {
    color: APP_COLORS.lightText,
  },
});

export default PrivacyPolicyScreen;
