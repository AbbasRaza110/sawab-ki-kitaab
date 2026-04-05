import { APP_COLORS } from "@/constants/Colors";
import AuthWrapper, { authStyles } from "@/layouts/Auth/AuthWrapper";
import useSignIn from "@/layouts/Auth/SignIn/SignInContainer";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router"; // Import Link for navigation
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignInScreen = () => {
  const {
    control,
    handleLogin,
    errors,
    isLoading,
    isPasswordVisible,
    setIsPasswordVisible,
  } = useSignIn();

  // --- Form Content ---
  const FormContent = (
    <>
      {/* Email Input */}
      <Text style={authStyles.label}>Email Address</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View>
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
                onChangeText={onChange}
                value={value}
              />
            </View>
            {errors.email && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {errors.email.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Password Input */}
      <Text style={[authStyles.label, { marginTop: 15 }]}>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View>
            <View style={authStyles.inputWrapper}>
              <FontAwesome5
                name="lock"
                size={18}
                color={APP_COLORS.placeholder}
                style={authStyles.icon}
              />

              <TextInput
                style={[authStyles.input, { flex: 1 }]}
                placeholder="Enter your password"
                placeholderTextColor={APP_COLORS.placeholder}
                secureTextEntry={!isPasswordVisible}
                onChangeText={onChange}
                value={value}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={{ padding: 10 }}
              >
                <MaterialCommunityIcons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color={APP_COLORS.placeholder}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {errors.password.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Forgot Password Link */}
      <TouchableOpacity
        style={{ alignSelf: "flex-end", marginBottom: 10, marginTop: 10 }}
        onPress={() => navigate("/(auth)/forgot_password")}
      >
        <Text>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        style={authStyles.primaryButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading && <ActivityIndicator color="#fff" />}
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
