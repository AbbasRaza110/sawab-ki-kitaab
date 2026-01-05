import { APP_COLORS } from "@/constants/Colors";
import AuthWrapper, { authStyles } from "@/layouts/Auth/AuthWrapper";
import useSignUp from "@/layouts/Auth/SignUp/SignUpContainer";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router"; // Import Link for navigation
import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignUpScreen = () => {
  const { handleSignUp, credentials, setCredentials, isLoading } = useSignUp();
  // --- Form Content ---
  const FormContent = (
    <>
      {/* Name Input */}
      <View style={authStyles.inputWrapper}>
        <MaterialCommunityIcons
          name="account-outline"
          size={20}
          color={APP_COLORS.placeholder}
          style={authStyles.icon}
        />
        <TextInput
          style={authStyles.input}
          placeholder="Name"
          placeholderTextColor={APP_COLORS.placeholder}
          keyboardType="default"
          onChange={(e) =>
            setCredentials({
              name: e.nativeEvent.text,
              email: credentials.email,
              password: credentials.password,
              confirmPassword: credentials.confirmPassword,
            })
          }
        />
      </View>

      {/* Email Input */}
      <View style={authStyles.inputWrapper}>
        <MaterialCommunityIcons
          name="email-outline"
          size={20}
          color={APP_COLORS.placeholder}
          style={authStyles.icon}
        />
        <TextInput
          style={authStyles.input}
          placeholder="Email"
          placeholderTextColor={APP_COLORS.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          onChange={(e) =>
            setCredentials({
              name: credentials.name,
              email: e.nativeEvent.text,
              password: credentials.password,
              confirmPassword: credentials.confirmPassword,
            })
          }
        />
      </View>

      {/* Password Input */}
      <View style={authStyles.inputWrapper}>
        <FontAwesome5
          name="lock"
          size={18}
          color={APP_COLORS.placeholder}
          style={authStyles.icon}
        />
        <TextInput
          style={authStyles.input}
          placeholder="Password"
          placeholderTextColor={APP_COLORS.placeholder}
          secureTextEntry={true}
          onChange={(e) =>
            setCredentials({
              name: credentials.name,
              email: credentials.email,
              password: e.nativeEvent.text,
              confirmPassword: credentials.confirmPassword,
            })
          }
        />
      </View>

      {/* Confirm Password Input */}
      <View style={authStyles.inputWrapper}>
        <FontAwesome5
          name="lock"
          size={18}
          color={APP_COLORS.placeholder}
          style={authStyles.icon}
        />
        <TextInput
          style={authStyles.input}
          placeholder="Confirm Password"
          placeholderTextColor={APP_COLORS.placeholder}
          secureTextEntry={true}
          onChange={(e) =>
            setCredentials({
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
              confirmPassword: e.nativeEvent.text,
            })
          }
        />
      </View>

      {/* Create Account Button */}
      <TouchableOpacity style={authStyles.primaryButton} onPress={handleSignUp}>
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
      showAppTitle={false}
      children={FormContent}
      footer={FooterContent}
      title="Create Your Account" // Specific screen title
      subtitle="Join to track your spiritual journey."
    />
  );
};

export default SignUpScreen;
