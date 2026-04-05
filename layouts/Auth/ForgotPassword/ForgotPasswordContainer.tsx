import apiClient from "@/services/apiService";
import { push } from "expo-router/build/global-state/routing";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner-native";
import { forgotPasswordResolver } from "./ForgotPasswordSchema";

export type ForgotPasswordFormValues = {
  email: string;
};

export default function useForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: forgotPasswordResolver,
    mode: "all",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      console.log("Sending forgot password request for:", data.email);

      setIsLoading(true);
      const response = await apiClient.post("/auth/forgot-password", {
        email: data.email,
      });
      const params = { email: data.email, otp: response.data.testOtp };
      console.log("Forgot Password Response:", response.data, params);
      push({ pathname: "/(auth)/reset_password", params });
    } catch (error: any) {
      toast.error("Error", {
        description: error?.response.data.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = handleSubmit(onSubmit);

  return {
    control,
    handleForgotPassword,
    errors,
    isLoading,
  };
}
