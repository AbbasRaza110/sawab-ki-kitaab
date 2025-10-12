import { APP_COLORS } from "@/constants/Colors";
import AuthWrapper, { authStyles } from "@/layouts/Auth/AuthWrapper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ForgotPasswordScreen = () => {
  // --- Form Content ---
  const FormContent = (
    <>
      {/* Email Input */}
      <Text style={[authStyles.label, { marginTop: 20 }]}>Email Address</Text>
      <View style={authStyles.inputWrapper}>
        <MaterialCommunityIcons
          name="email-outline"
          size={20}
          color={APP_COLORS.placeholder}
          style={authStyles.icon}
        />
        <TextInput
          style={authStyles.input}
          placeholder="you@example.com"
          placeholderTextColor={APP_COLORS.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Send Reset Link Button */}
      <TouchableOpacity
        style={[authStyles.primaryButton, { marginTop: 10 }]}
        onPress={() => navigate("/(auth)/reset_password")}
      >
        <Text style={authStyles.primaryButtonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </>
  );

  // --- Footer Content ---
  const FooterContent = (
    <>
      <Text style={authStyles.footerText}>Remembered your password?</Text>
      {/* Use Link to navigate back to the sign-in screen */}
      <Link href={"/(auth)/sign_in"} asChild>
        <TouchableOpacity>
          <Text style={authStyles.linkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </>
  );

  return (
    <AuthWrapper
      iconName="cogs"
      showAppTitle={false}
      children={FormContent}
      footer={FooterContent}
      title="Can't log in?"
      subtitle=" Enter your email address and we'll send you a link to get back into your account."
    />
  );
};

// --- Screen-specific Styles ---
const styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  largeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: APP_COLORS.text,
    marginBottom: 5,
  },
  helpText: {
    textAlign: "center",
    fontSize: 14,
    color: APP_COLORS.lightText,
    lineHeight: 20,
  },
});

export default ForgotPasswordScreen;
