import { APP_COLORS } from "@/constants/Colors";
import AuthWrapper, { authStyles } from "@/layouts/Auth/AuthWrapper";
import useSignUp from "@/layouts/Auth/SignUp/SignUpContainer";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router"; // Import Link for navigation
import React from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignUpScreen = () => {
  const { control, handleSignUp, errors, isLoading } = useSignUp();

  // --- Form Content ---
  const FormContent = (
    <>
      {/* Name Input */}
      <Text style={authStyles.label}>Full Name</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <View>
            <View style={authStyles.inputWrapper}>
              <MaterialCommunityIcons
                name="account-outline"
                size={20}
                color={APP_COLORS.placeholder}
                style={authStyles.icon}
              />
              <TextInput
                style={authStyles.input}
                placeholder="Your Name"
                placeholderTextColor={APP_COLORS.placeholder}
                keyboardType="default"
                onChangeText={onChange}
                value={value}
              />
            </View>
            {errors.name && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {errors.name.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Email Input */}
      <Text style={[authStyles.label, errors && { marginTop: 15 }]}>
        Email Address
      </Text>
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
      <Text style={[authStyles.label, errors && { marginTop: 15 }]}>
        Password
      </Text>
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
                style={authStyles.input}
                placeholder="Enter your password"
                placeholderTextColor={APP_COLORS.placeholder}
                secureTextEntry={true}
                onChangeText={onChange}
                value={value}
              />
            </View>
            {errors.password && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {errors.password.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Confirm Password Input */}
      <Text style={[authStyles.label, errors && { marginTop: 15 }]}>
        Confirm Password
      </Text>
      <Controller
        control={control}
        name="confirmPassword"
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
                style={authStyles.input}
                placeholder="Confirm your password"
                placeholderTextColor={APP_COLORS.placeholder}
                secureTextEntry={true}
                onChangeText={onChange}
                value={value}
              />
            </View>
            {errors.confirmPassword && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Create Account Button */}
      <TouchableOpacity
        style={[authStyles.primaryButton, { marginTop: 20 }]}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        {isLoading && <ActivityIndicator color="#fff" />}
        <Text style={authStyles.primaryButtonText}>Create Account</Text>
      </TouchableOpacity>
    </>
  );

  // --- Footer Content ---
  const FooterContent = (
    <>
      <Text style={authStyles.footerText}>Already have an account?</Text>
      {/* Use Link to navigate to the sign-in screen */}
      <Link href="/(auth)" asChild>
        <TouchableOpacity>
          <Text style={authStyles.linkText}>Sign In</Text>
        </TouchableOpacity>
      </Link>
    </>
  );

  return (
    <AuthWrapper
      headerStyles={{ marginTop: 50 }}
      showAppTitle={false}
      children={FormContent}
      footer={FooterContent}
      title="Create Your Account"
      subtitle="Join to track your spiritual journey."
    />
  );
};

export default SignUpScreen;
