import { APP_COLORS } from "@/constants/Colors";
import { scale, verticalScale } from "@/constants/metrics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import useProfile from "@/layouts/App/Profile/useProfile";

const SETTINGS_ITEMS = [
  { icon: "shield-outline", title: "Privacy", key: "privacy" },
  { icon: "information-outline", title: "About", key: "about" },
];

const ProfileScreen = () => {
  const { handleLogout, isLoading, userData } = useProfile();
  const initials = userData?.name
    ? userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";
  return (
    <View style={styles.outerContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        {/* Profile Header Section */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity style={styles.avatar}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userData?.name}</Text>
          {/* <Text style={styles.userHandle}>{userData?.email}</Text> */}
          <Text style={styles.joinDate}>Joined 2022</Text>
        </View>

        {/* Personal Details Section */}
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailItem}>
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color={APP_COLORS.primary}
              />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Email</Text>

              <Text style={styles.detailValue}>{userData?.email}</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsCard}>
          {SETTINGS_ITEMS.map((item, index) => (
            <React.Fragment key={item.key}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.iconBackground}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={24}
                    color={APP_COLORS.primary}
                  />
                </View>
                <Text style={styles.settingLabel}>{item.title}</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={APP_COLORS.lightText}
                />
              </TouchableOpacity>
              {/* Add divider only if it's not the last item */}
              {index < SETTINGS_ITEMS.length - 1 && (
                <View style={styles.settingDivider} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          {isLoading && <ActivityIndicator color={APP_COLORS.logoutText} />}
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={APP_COLORS.logoutText}
          />

          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  iconBackground: {
    backgroundColor: APP_COLORS.primaryAppBg,
    padding: scale(8),
    borderRadius: scale(6),
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: APP_COLORS.text,
    fontWeight: "bold",
  },
  header: {
    alignItems: "center",
  },

  outerContainer: {
    flex: 1,
    padding: scale(16),
    // gap: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
    // backgroundColor: APP_COLORS.background,
    borderRadius: 15,
    marginTop: 10,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  avatarInitials: {
    color: APP_COLORS.white,
    fontSize: scale(20),
    fontWeight: "bold",
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: APP_COLORS.primary,
    borderRadius: 50,
    alignItems: "center", // Center horizontally
    justifyContent: "center",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: APP_COLORS.primary,
    borderRadius: 15,
    padding: 6,
    borderWidth: 2,
    borderColor: APP_COLORS.background,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: APP_COLORS.text,
    marginBottom: 2,
  },
  userHandle: {
    fontSize: 16,
    color: APP_COLORS.primary,
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: APP_COLORS.lightText,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: APP_COLORS.text,
    paddingVertical: verticalScale(10),
  },
  detailsCard: {
    backgroundColor: APP_COLORS.background,
    borderRadius: 10,
    padding: scale(15),
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  detailTextContainer: {
    marginLeft: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: APP_COLORS.lightText,
  },
  detailValue: {
    fontSize: 16,
    color: APP_COLORS.text,
    fontWeight: "500",
  },
  settingsCard: {
    backgroundColor: APP_COLORS.background,
    borderRadius: 10,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: APP_COLORS.text,
    marginLeft: 15,
  },
  settingDivider: {
    height: 1,
    backgroundColor: APP_COLORS.inputBackground,
    marginLeft: 55,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: APP_COLORS.logoutBg,
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
    marginHorizontal: 10,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: APP_COLORS.logoutText,
    marginLeft: 10,
  },
  // --- Bottom Navigation Bar Styles ---
  bottomNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: APP_COLORS.background,
    borderTopWidth: 1,
    borderTopColor: APP_COLORS.inputBackground,
    height: 60,
    // Explicitly positioning it at the bottom of the outer container
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure it sits above the scroll content
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    color: APP_COLORS.lightText,
    marginTop: 4,
  },
});

export default ProfileScreen;
