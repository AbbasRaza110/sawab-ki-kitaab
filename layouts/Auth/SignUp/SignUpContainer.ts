import apiClient from "@/services/apiService";
import {dismissTo} from "expo-router/build/global-state/routing";
import React from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner-native";
import {signUpResolver} from "./SignUpSchema";

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function useSignUp() {
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: signUpResolver,
    mode: "all",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Success", {
        description: "You are successfully registered.",
      });

      dismissTo("/(auth)");
    } catch (error: any) {
      toast.error("Error", {
        description: error?.response.data.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const handleSignUp = handleSubmit(onSubmit);

  return {
    control,
    handleSignUp,
    errors,
    isPasswordVisible,
    setIsPasswordVisible,
    isLoading,
  };
}
