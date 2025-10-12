import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native"; // Removed SafeAreaView import
// Assuming APP_COLORS is correctly configured at this path
import { APP_COLORS } from "@/constants/Colors";
import { AuthWrapperProps } from "./types";

/**
 * Reusable wrapper for authentication screens (Sign In, Sign Up).
 * It provides the main centered layout and the common logo header.
 * The responsibility for SafeArea insets is now managed by the root navigator.
 * @param {object} props
 * @param {React.ReactNode} props.children - The form content (inputs, button).
 * @param {React.ReactNode} props.footer - The footer navigation link (e.g., "Sign Up" or "Sign In").
 */
const AuthWrapper = ({
  children,
  iconName = "book-open-variant",
  footer,
  title,
  subtitle,
  showAppTitle = true,
}: AuthWrapperProps) => {
  return (
    // Replaced SafeAreaView with a standard View, applying the full screen layout styles
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Logo and Screen Title Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name={iconName as any}
              size={40}
              color={APP_COLORS.primary}
            />
            {/* Using a generic name here for reuse, specific titles passed via prop */}
            {showAppTitle && (
              <Text style={styles.logoText}>Sawab Ki Kitaab</Text>
            )}
          </View>
          {title && <Text style={styles.logoText}>{title}</Text>}
          {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View>

        {/* --- Dynamic Form Content --- */}
        <View style={styles.form}>{children}</View>

        {/* --- Dynamic Footer --- */}
        <View style={styles.footer}>{footer}</View>
      </View>
    </View>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  // Renamed from safeArea to container and kept the full-screen centering styles
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 30, // Increased padding for better spacing
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: "column", // Changed back to row for horizontal logo/text
    alignItems: "center",
    marginBottom: 5,
  },
  logoText: {
    fontSize: 34,
    fontWeight: "bold",
    color: APP_COLORS.text, // UPDATED: Using APP_COLORS.text
    marginLeft: 5,
    letterSpacing: -0.5,
  },
  welcomeText: {
    fontSize: 24, // Larger title for the screen
    fontWeight: "bold",
    color: APP_COLORS.text, // UPDATED: Using APP_COLORS.text
    marginTop: 15,
  },
  subtitleText: {
    fontSize: 14,
    color: APP_COLORS.lightText, // UPDATED: Using APP_COLORS.lightText
    marginTop: 5,
    textAlign: "center",
    maxWidth: 300,
  },
  form: {
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  // --- Common Reusable Styles (Inputs, Buttons, Links) ---
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: APP_COLORS.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15, // Added margin bottom for spacing between fields
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: APP_COLORS.text, // UPDATED: Using APP_COLORS.text
    height: "100%",
  },
  label: {
    fontSize: 15,
    color: APP_COLORS.text, // UPDATED: Using APP_COLORS.text
    fontWeight: "600",
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: APP_COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    shadowColor: APP_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  primaryButtonText: {
    color: APP_COLORS.background,
    fontSize: 18,
    fontWeight: "bold",
  },
  // Footer Link Styles
  linkText: {
    fontSize: 15,
    color: APP_COLORS.primary,
    fontWeight: "bold",
    marginLeft: 5,
  },
  footerText: {
    fontSize: 15,
    color: APP_COLORS.lightText, // UPDATED: Using APP_COLORS.lightText
  },
});

// Export styles for use in child components
export const authStyles = styles;
export default AuthWrapper;
