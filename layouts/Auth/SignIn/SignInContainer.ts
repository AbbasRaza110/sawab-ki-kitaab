import apiClient from "@/services/apiService";
import useAuthStore from "@/store/AuthStore";
import React from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner-native";
import {signInResolver} from "./SignInSchema";

export type SignInFormValues = {
  email: string;
  password: string;
};

export default function useSignIn() {
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: signInResolver,
    mode: "all",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const {setIsAuth} = useAuthStore();

  // Watch form values for real-time updates
  const credentials = watch();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post("/auth/login", data);

      if (response.status == 201) {
        setIsAuth(true);
        reset();
      }
    } catch (error: any) {
      toast.error("Error", {
        description: error?.response.data.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = handleSubmit(onSubmit);

  return {
    control,
    handleLogin,
    credentials,
    errors,
    isLoading,
    isPasswordVisible,
    setIsPasswordVisible,
  };
}
