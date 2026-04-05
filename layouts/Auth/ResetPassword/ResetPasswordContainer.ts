import apiClient from "@/services/apiService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner-native";
import { resetPasswordResolver } from "./ResetPasswordSchema";

export type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export default function useResetPassword() {
  const { email, otp } = useLocalSearchParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: resetPasswordResolver,
    mode: "all",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState({
    password: false,
    confirmPassword: false,
  });

  console.log("asdasdas", email, otp);

  // Watch form values for real-time updates
  const credentials = watch();

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post("/auth/reset-password", {
        password: data.password,
        confirmPassword: data.confirmPassword,
        email,
        otp,
      });
      toast.success("Success", {
        description: "Your password has been reset successfully.",
      });
      router.replace("/(auth)");
    } catch (error: any) {
      toast.error("Error", {
        description: error?.response.data.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = handleSubmit(onSubmit);

  return {
    control,
    handleResetPassword,
    credentials,
    errors,
    isLoading,
    isPasswordVisible,
    setIsPasswordVisible,
  };
}
