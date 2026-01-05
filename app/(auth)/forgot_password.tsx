import { APP_COLORS } from "@/constants/Colors";
import AuthWrapper, { authStyles } from "@/layouts/Auth/AuthWrapper";
import useForgotPassword from "@/layouts/Auth/ForgotPassword/ForgotPasswordContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ForgotPasswordScreen = () => {
  const { email, handleForgotPassword, setEmail, isLoading } =
    useForgotPassword();
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
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
      </View>

      {/* Send Reset Link Button */}
      <TouchableOpacity
        style={[authStyles.primaryButton, { marginTop: 10 }]}
        onPress={handleForgotPassword}
      >
        {isLoading && <ActivityIndicator color={"#fff"} />}
        <Text style={authStyles.primaryButtonText}>Submit</Text>
      </TouchableOpacity>
    </>
  );

  // --- Footer Content ---
  const FooterContent = (
    <>
      <Text style={authStyles.footerText}>Remembered your password?</Text>
      {/* Use Link to navigate back to the sign-in screen */}
      <Link href={"/(auth)"} asChild>
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
      subtitle="Enter your email address to reset your password."
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
