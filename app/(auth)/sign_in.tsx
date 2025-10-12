import { APP_COLORS } from "@/constants/Colors";
import AuthWrapper, { authStyles } from "@/layouts/Auth/AuthWrapper";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router"; // Import Link for navigation
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const SignInScreen = () => {
  // --- Form Content ---
  const FormContent = (
    <>
      {/* Email Input */}
      <Text style={authStyles.label}>Email Address</Text>
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

      {/* Password Input */}
      <Text style={[authStyles.label, { marginTop: 5 }]}>Password</Text>
      <View style={authStyles.inputWrapper}>
        <FontAwesome5
          name="lock"
          size={18}
          color={APP_COLORS.placeholder}
          style={authStyles.icon}
        />
        <TextInput
          style={authStyles.input}
          placeholder="Enter your password"
          placeholderTextColor={APP_COLORS.placeholder}
          secureTextEntry={true}
        />
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity
        style={{ alignSelf: "flex-end", marginBottom: 10 }}
        onPress={() => navigate("/(auth)/forgot_password")}
      >
        <Text>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        style={authStyles.primaryButton}
        onPress={() => navigate("/(auth)/sign_up")}
      >
        <Text style={authStyles.primaryButtonText}>Sign In</Text>
      </TouchableOpacity>
    </>
  );

  // --- Footer Content ---
  const FooterContent = (
    <>
      <Text style={authStyles.footerText}>Don't have an account?</Text>
      {/* Use Link to navigate to the sign-up screen */}
      <Link href="/(auth)/sign_up" asChild>
        <TouchableOpacity>
          <Text style={authStyles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </>
  );

  return (
    <AuthWrapper
      children={FormContent}
      footer={FooterContent}
      subtitle="Welcome back, Please sign in to continue."
    />
  );
};

export default SignInScreen;
