import { APP_COLORS } from "@/constants/Colors";
import AuthWrapper, { authStyles } from "@/layouts/Auth/AuthWrapper";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ResetPasswordScreen = () => {
  // --- Form Content ---
  const FormContent = (
    <>
      {/* New Password Input */}
      <Text style={[authStyles.label, { marginTop: 20 }]}>New Password</Text>
      <View style={authStyles.inputWrapper}>
        <FontAwesome5
          name="lock"
          size={18}
          color={APP_COLORS.placeholder}
          style={authStyles.icon}
        />
        <TextInput
          style={authStyles.input}
          placeholder="Enter new password"
          placeholderTextColor={APP_COLORS.placeholder}
          secureTextEntry={true}
        />
        {/* Toggle password visibility icon */}
        <MaterialCommunityIcons
          name="eye-outline"
          size={20}
          color={APP_COLORS.lightText}
        />
      </View>

      {/* Confirm New Password Input */}
      <Text style={authStyles.label}>Confirm New Password</Text>
      <View style={authStyles.inputWrapper}>
        <FontAwesome5
          name="lock"
          size={18}
          color={APP_COLORS.placeholder}
          style={authStyles.icon}
        />
        <TextInput
          style={authStyles.input}
          placeholder="Confirm new password"
          placeholderTextColor={APP_COLORS.placeholder}
          secureTextEntry={true}
        />
        {/* Toggle password visibility icon */}
        <MaterialCommunityIcons
          name="eye-outline"
          size={20}
          color={APP_COLORS.lightText}
        />
      </View>

      {/* Reset Password Button */}
      <TouchableOpacity
        style={[authStyles.primaryButton, { marginTop: 10 }]}
        onPress={() => navigate("/(auth)/sign_in")}
      >
        <Text style={authStyles.primaryButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </>
  );

  // No footer link needed as the action is to reset and likely navigate to sign-in
  return (
    <AuthWrapper
      children={FormContent}
      title="Reset Password"
      showAppTitle={false}
      iconName="lock-reset"
      subtitle="Your new password must be different from previously used passwords."
    />
  );
};

// --- Screen-specific Styles (reused from ForgotPasswordScreen) ---
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

export default ResetPasswordScreen;
